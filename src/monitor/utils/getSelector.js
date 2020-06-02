function getSelector(paths) {
    return paths.reverse().filter(el=>{
        return el!==document && el!==window
    }).map(el=>{
        let seletor =""
        if(el.id){
            return `${el.nodeName.toLowerCase()}#${el.id}`
        } else if(el.className && typeof el.className === 'string'){
            return `${el.nodeName.toLowerCase()}.${el.className}`
        } else {
            seletor = el.nodeName.toLowerCase()
        }
        return seletor
    }).join(' ')
}


export default function (path) {
    if(Array.isArray(path)){
        return getSelector(path)
    }
}