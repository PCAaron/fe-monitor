let lastEvent

['click','touchstart','mousedown','keydown','mouseover'].forEach(e=>{
    document.addEventListener(e, (event)=>{
        lastEvent = event
    }, {
        capture: true, // 捕获阶段
        passive: true //默认不阻止默认事件
    })
})

export default function () {
    return lastEvent
}