import tracker from '../utils/tracker'
import onload from '../utils/onload'

export default function timing() {
    onload(()=>{
        setTimeout(()=>{
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                responseStart,
                responseEnd,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart
            } = performance.timing
            tracker.send({
                kind: 'experience', //体验指标
                type: 'timing',
                contentTime: connectEnd - connectStart, // 链接时间
                ttfbTime: responseStart - requestStart, // 首字节到达时间
                responseTime: responseEnd - responseStart, // 响应的读取时间
                parseDOMTime: loadEventStart - domLoading, //DOM解析的时间
                domContentLoadedTime: domContentLoadedEventEnd -domContentLoadedEventStart,
                timeToInteractive: domInteractive - fetchStart, //首次可交互时间
                loadTime: loadEventStart - fetchStart //页面完全加载时间
            })
        },3000)
    })
}