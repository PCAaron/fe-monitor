import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker'

export function injectJsError() {
    // 监听全局未捕获的错误
    window.addEventListener('error', (e) => {
        console.log(e)
        let log
        let lastEvent = getLastEvent() // 获取最后一个交互事件
        // 判断资源加载错误还是脚本错误
        if(e.target && (e.target.src || e.target.href)){
            log = {
                kind: 'stability', //监控指标大类
                type: 'error', //小类型
                errorType: 'resourceError', //资源加载错误
                filename: e.target.src || e.target.href, //报错文件
                tagName: e.target.tagName,
                selector: getSelector(e.target)//最后一个操作的元素
            }
        } else {
            log = {
                kind: 'stability', //监控指标大类
                type: 'error', //小类型
                errorType: 'jsError', //js执行错误
                message: e.message,// 错误描述
                filename: e.filename, //报错文件
                position: `${e.lineno}：${e.colno}`,//报错行列
                stack: e.error.stack.replace('/\s/','\n'), //堆栈
                selector: lastEvent ? getSelector(lastEvent.path): '' //最后一个操作的元素
            }
        }

        console.log(log)
        tracker.send(log)
    }, true)
    // promise
    window.addEventListener('unhandledrejection',(e)=>{
        console.log(e)
        let lastEvent = getLastEvent()
        let message
        let reason = e.reason
        let filename
        let line=0
        let col=0
        let stack=''
        if(typeof e.reason === 'string'){
            message = reason
        } else if(typeof reason === 'object'){
            if(reason.stack){
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
                filename = matchResult[1]
                line=matchResult[2]
                col=matchResult[3]
                message=reason.message
            }
            stack=getLines(reason.stack)
        }
        let log = {
            kind: 'stability', //监控指标大类
            type: 'error', //小类型
            errorType: 'promiseError', //js执行错误
            url: '', // 报错路径
            message,// 错误描述
            filename, //报错文件
            position: `${line}：${col}`,//报错行列
            stack, //堆栈
            selector: lastEvent ? getSelector(lastEvent.path): '' //最后一个操作的元素
        }
        console.log(log)
        tracker.send(log)
    })
}

function getLines(stack) {
    return stack.split('\n').slice(1).map(item => item.replace('/^\s+at\s/g','')).join('^')
}