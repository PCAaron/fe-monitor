import tracker from '../utils/tracker'

export default function injectXHR(){
    let XMLHttpRequest = window.XMLHttpRequest
    let oldOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function (method,url,async) {
        if(!url.match(/logstores/)) {
            this.logData = {method, url, async}
        }
        return oldOpen.apply(this,arguments)
    }
    let oldSend = XMLHttpRequest.prototype.send
    let startTime
    XMLHttpRequest.prototype.send = function (body) {
        if(this.logData){
            startTime = Date.now() // 发送前记录开始时间
            let hanlder = (type) => (event) => {
                let duration = Date.now() - startTime
                let status = this.status
                let statusText = this.statusText
                tracker.send({
                    kind: 'stability',
                    type: 'xhr',
                    eventType: type,
                    pathname: this.logData.url,
                    status: status + '-' + statusText,
                    duration,
                    response: this.response ? JSON.stringify(this.response) : '',
                    params: body || ''
                })
            }
            this.addEventListener('load',hanlder('load'),false)
            this.addEventListener('error',hanlder('error'),false)
            this.addEventListener('abort',hanlder('abort'),false)
        }
        return oldSend.apply(this,arguments)
    }
}