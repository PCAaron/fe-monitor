import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker'

export function injectJsError() {
    // 监听全局未捕获的错误
    window.addEventListener('error', (e) => {
        // console.log(e)
        let lastEvent = getLastEvent() // 获取最后一个交互事件
        let log = {
            kind: 'stability', //监控指标大类
            type: 'error', //小类型
            errorType: 'jsError', //js执行错误
            url: '', // 报错路径
            message: e.message,// 错误描述
            filename: e.filename, //报错文件
            position: `${e.lineno}：${e.colno}`,//报错行列
            stack: e.error.stack.replace('/\s/','\n'), //堆栈
            selector: lastEvent ? getSelector(lastEvent.path): '' //最后一个操作的元素
        }
        console.log(log)
        tracker.send(log)
    })
}

function getLines(stack) {
    return stack.split('\n').slice(1).map(item => item.replace('/^\s+at\s/g','')).join('^')
}