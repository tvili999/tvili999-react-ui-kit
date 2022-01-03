export default (...styles) => {
    let result = undefined;
    for(let styleArray of styles) {
        if(!styleArray)
            continue;

        if(!Array.isArray(styleArray))
            styleArray = [styleArray];
        
        for(const style of styleArray) {
            if(!style || typeof style !== "object")
                continue;
            if(!result)
                result = {};
            
            result = {...result, ...style};
        }
    }

    return result;
}