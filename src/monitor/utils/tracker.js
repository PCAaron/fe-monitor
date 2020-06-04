let host = 'cn-shenzhen.log.aliyuncs.com'
let project= 'js-monitor'
let logStore= 'jsmonitor-store'
let userAgent = require('user-agent')
function getExtData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent).name
    }
}

class SendTracker{
    constructor(){
        this.url = `http://${project}.${host}/logstores/${logStore}/track`// 上报路径
        this.xhr = new XMLHttpRequest
    }
    send(data={}){
        let extraData = getExtData()
        let log = {...extraData,...data}
        // 对象的值不能是数字:阿里云要求
        for(let key in log){
            if(typeof log[key] === 'number'){
                log[key]=`${log[key]}`
            }
        }
        console.log(log)
        let body = JSON.stringify({
            __logs__: [log]
        })

        this.xhr.open('POST',this.url,true)
        this.xhr.setRequestHeader('Content-Type','application/json')
        this.xhr.setRequestHeader('x-log-apiversion','0.6.0')
        this.xhr.setRequestHeader('x-log-bodyrawsize',body.length)
        this.xhr.onload = function () {
            //console.log(this.xhr.response)
        }
        this.xhr.onerror = function (err) {
            //console.log(err)
        }
        this.xhr.send(body)
    }
}

export default new SendTracker()