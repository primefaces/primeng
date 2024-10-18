export default {
    _loadedStyleNames: new Set(),
    getLoadedStyleNames() {
        return this._loadedStyleNames;
    },
    isStyleNameLoaded(name) {
        return this._loadedStyleNames.has(name);
    },
    setLoadedStyleName(name) {
        this._loadedStyleNames.add(name);
    },
    deleteLoadedStyleName(name) {
        this._loadedStyleNames.delete(name);
    },
    clearLoadedStyleNames() {
        this._loadedStyleNames.clear();
    },
};

export function styleClassAttribute(value: any): string | undefined{
    if(typeof value === 'string'){
        return value;
    }else if(Array.isArray(value)){
        return value.join(' ');
    }else if(value){
        return Object.keys(value)
            .filter(key => value[key])
            .join(' ');
    }else{
        return value
    }
}


