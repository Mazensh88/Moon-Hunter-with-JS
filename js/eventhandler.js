const MyEventHandler = function() {
    let listeners = { };

    const register = function(event, func) {
        if (!listeners[event]) {
            listeners[event] = [];
        }

        listeners[event].push(func)
    };

    const disable = function(event = undefined) {
        if (event === undefined) {
            listeners = { };
        }
        
        if (listeners[event] !== undefined) {
            delete listeners[event];
        }
    };

    const trigger = function(event, ...args) {
        if (listeners[event]) {
            for(let i in listeners[event]) {
                listeners[event][i](...args);
            }
        }
    };

    return {
        register: register,
        disable: disable,
        trigger: trigger
    }
};