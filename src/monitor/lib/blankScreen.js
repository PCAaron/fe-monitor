import tracker from '../utils/tracker'
import onload from '../utils/onload'

export default function blankScreen() {
    let wrapperElements = ['html','body','#container','.content']// 默认为空白点
    let emptyPoints = 0
    onload(()=>{
        for (let i=0;i<=9;i++) {
            let xElement = document.elementFromPoint(
                window.innerWidth*i/10,
                window.innerHeight/2
            )
            let yElement = document.elementFromPoint(
                window.innerWidth/2,
                window.innerHeight*i/10
            )
            isWrapper(xElement[0])
            isWrapper(yElement[0])
        }
        if(emptyPoints >= 16){
            let centerElements = document.elementFromPoint(
                window.innerWidth/2,window.innerHeight/2
            )
            tracker.send({
                kind: 'stability',
                type:'blank',
                emptyPoints,
                screen: window.screen.width+'X'+window.screen.height,
                viewPoint: window.innerWidth+'X'+window.innerHeight,
                selector:getSelector(centerElements[0])
            })
        }
    })

    function getSelector(el) {
        if(el.id){
            return '#'+id
        } else if (el.className) {
            let _type = el.className.split(' ').filter(item => !!item).join('.')
            return _type
        } else {
            return el.nodeName.toLowerCase()
        }
    }
    function isWrapper(el) {
        debugger
        let selector = getSelector(el)
        if(wrapperElements.indexOf(selector) != -1){
            emptyPoints++
        }
    }
}