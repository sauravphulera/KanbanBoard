
export const createMapFromObject = (arr) => {
    if(!arr || !arr.length || arr.length === 0) {
        return {}
    }
    const result = {};
    for(let el of arr) {
        result[el.id] = el.name;
    }

    return result;
}

