const functional = {
    filterObj: (obj, filter) => {
        if(!filter || Object.keys(filter) === 0)
            return true;
        for(const key of Object.keys(filter))
            if(obj[key] !== filter[key])
                return true;
        return false;
    },
    replaceIndex: (array, index, value) => {
        array = array || []
        return array.map((x, i) => i === index ? value : x);
    },
    upsert: (array, predicate, value) => {
        array = array || []
        let idx = array.findIndex(predicate);
        if(idx === -1)
            return [...array, value];
        
        return functional.replaceIndex(array, idx, value);
    },
    removeIndex: (array, index) => {
        array = array || []
        return array.filter((_, i) => i !== index)
    },
    not: (predicate) => {
        return (...props) => !predicate(...props);
    },
    remove: (array, predicate) => {
        array = array || []
        return array.filter(functional.not(predicate))
    }
}

export default functional;