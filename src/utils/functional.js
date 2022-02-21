const functional = {
    filterObj: (obj, filter) => {
        if(!filter || Object.keys(filter) === 0)
            return true;
        for(const key of Object.keys(filter))
            if(obj[key] !== filter[key])
                return true;
        return false;
    },
    mapObj: (obj, fn) => {
        return Object.keys(obj)
            .reduce(
                (o, key) => {
                    o[key] = fn(obj[key], key);
                    return o;
                },
                {}
            )
    },
    entries: (obj) => {
        return Object.keys(obj).map(key => (({ key, value: obj[key] })));
    },
    group: (arr, keySupplier) => {
        return arr.reduce((obj, val) => {
            const key = keySupplier(val);
            if(!obj[key])
                obj[key] = [];
            obj[key].push(val);
            return obj;
        }, {});
    },
    merge: (original, merged) => {
        if(Array.isArray(original) && Array.isArray(merged))
            return [...original, ...merged];

        if(typeof original === "object" && typeof merged === "object")
            return functional.mapObj(original, (value, key) => merged.hasOwnProperty(key) ? 
                functional.merge(value, merged[key]) : 
                value
            )
        
        return merged;
    },
    replaceIndex: (array, index, value) => {
        array = array || [];
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