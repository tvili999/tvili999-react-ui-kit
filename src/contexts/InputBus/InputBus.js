import React from "react";

const { Consumer, Provider } = React.createContext();

export const EVENTS = {
    INPUT: 0,
    FOCUS: 1,
    SET_FOCUS: 2,
    BLUR: 3,
};

class InputBus extends React.Component {
    subscribers = {};
    state = {
        inputs: [],
        fireEvent: (group, ...args) => {
            for (const subscriber of this.subscribers[group] || [])
                subscriber.eventHandler(...args);
        },
        registerInput: (name) => {
            this.setState({
                inputs: [...this.state.inputs, name],
            });
        },
        unregisterInput: (name) => {
            this.setState({
                inputs: this.state.inputs.filter((x) => x !== name),
            });
        },
        getSubscribers: () => {
            return this.subscribers;
        },
        subscribe: (group, subscriber) => {
            this.subscribers[group] ||= [];
            this.subscribers[group].push(subscriber);
        },
        unsubscribe: (group, subscriber) => {
            if (!this.subscribers[group]) return;
            const idx = this.subscribers[group].indexOf(subscriber);
            if (idx === -1) return;
            this.subscribers[group].splice(idx, 1);
        },
        focus: (group, name) => {
            this.state.fireEvent(group, EVENTS.FOCUS, name);
        },
    };

    render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
    }
}

export const withInputBus = (Component) => {
    const hoc = React.forwardRef((props, ref) => (
        <Consumer>
            {(value) => <Component ref={ref} inputBus={value} {...props} />}
        </Consumer>
    ));
    hoc.displayName = "withInputBus()";
    return hoc;
};

export default InputBus;
