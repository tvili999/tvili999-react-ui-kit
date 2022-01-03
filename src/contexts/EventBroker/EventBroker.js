import React, { Component } from "react";

const { Provider, Consumer } = React.createContext({
    register: () => {},
    unregister: () => {},
    emit: () => {}
});

export class EventBroker extends Component {
    events = {}
    api = {
        register: (event, handler) => {
            this.events = ({
                ...this.events,
                [event]: [...(this.events?.[event] || []), handler]
            })
        },
        unregister: (event, handler) => {
            if(!this.events[event] || !this.events[event].includes(handler))
                return;
            this.events = ({
                ...this.events,
                [event]: [...this.events?.[event], handler]
            })
        },
        emit: (event, ...parameters) => {
            if(!this.events[event])
                return
            for(const handler of this.events[event])
                handler(...parameters);
        }
    }

    render() {
        return (
            <Provider value={this.api}>
                {this.props.children}
            </Provider>
        )
    }
}

export const withEventBroker = Component => {
    const hoc = (props) => (
        <Consumer>
            {eventBroker => (
                <Component eventBroker={eventBroker} {...props}/>
            )}
        </Consumer>
    )

    hoc.displayName = "withEventBroker()";

    return hoc;
}

class EventListener extends Component {
    handler = (...props) => {
        this.props.onEmit?.(props)
    }
    componentDidMount() {
        this.props.eventBroker.register(this.props.event, this.handler);
    }

    componentWillUnmount() {
        this.props.eventBroker.unregister(this.props.event, this.handler);
    }

    render() {
        return this.props.children;
    }
}
EventListener = withEventBroker(EventListener);
export { EventListener }