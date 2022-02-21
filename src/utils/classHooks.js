let watchMountedSymbol = Symbol();
export const watchMounted = function() {
    this[watchMountedSymbol] ||= {}
    const state = this[watchMountedSymbol];

    if(state.watchMounted)
        return state.watchMounted;

    state.isMounted = true;
    didMountHook.call(this, () => state.isMounted = true, true);
    willUnmountHook.call(this, () => state.isMounted = false, true);

    return state.watchMounted = () => state.isMounted;
}

export const stateHook = function(name, value) {
    if(!this.state)
        this.state = {};
    
    Object.assign(this.state, { [name]: value })

    const isMounted = watchMounted.call(this);

    const setValue = (value, merge = true) => new Promise((resolve, reject) => {
        if(merge) {
            if(Array.isArray(this.state[name]) && Array.isArray(value)) {
                setValue([ ...this.state[name], ...value ], false)
                    .then(resolve)
                    .catch(reject)
            }
            else if(typeof this.state[name] === "object" && typeof value === "object") {
                setValue({ ...this.state[name], ...value }, false)
                    .then(resolve)
                    .catch(reject)
            }
            else
                setValue(value, false)
                    .then(resolve)
                    .catch(reject)
        }
        else {
            if(isMounted())
                this.setState({ [name]: value }, resolve);
            else
                reject();
        }
    })

    return setValue;
}

export const lifecycleHook = function(name, callback, urgent) {
    const existing = this[name];
    this[name] = (...props) => {
        if(urgent) {
            callback?.(...props);
            existing?.(...props);
        }
        else {
            existing?.(...props);
            callback?.(...props);
        }
    }
}

export const didMountHook = function(callback, urgent) {
    return lifecycleHook.call(this, "componentDidMount", callback, urgent);
}

export const didUpdateHook = function(callback, urgent) {
    return lifecycleHook.call(this, "componentDidUpdate", callback, urgent);
}

export const willUnmountHook = function(callback, urgent) {
    return lifecycleHook.call(this, "componentWillUnmount", callback, urgent);
}

const matchArray = (a, b) => {
    if(!Array.isArray(a) || !Array.isArray(b))
        return false;

    if(a.length !== b.length)
        return false;

    for(let i = 0; i < a.length; i++)
        if(a[i] !== b[i])
            return false;

    return true;
}

export const effectHook = function(effect, getDeps) {
    let prevDeps = null;
    let destruct = null;

    const handleEffect = () => {
        const deps = getDeps?.() || [];
        if(matchArray(prevDeps, deps))
            return;

        destruct?.();
        destruct = effect();
    }

    didMountHook.call(this, handleEffect);
    didUpdateHook.call(this, handleEffect);
    willUnmountHook.call(this, () => {
        destruct?.();
    });
}
