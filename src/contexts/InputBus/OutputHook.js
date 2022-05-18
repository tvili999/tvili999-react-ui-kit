import React from "react";
import { withInputBus, EVENTS } from "./InputBus";

class OutputHook extends React.Component {
    state = {
        focus: false,
    };
    constructor(props) {
        super(props);
        if (!this.props.group)
            throw "No group specified for InputBus OutputHook";
        if (!this.props.name) throw "No name specified for InputBus OutputHook";
    }

    __subscriber = {
        eventHandler: (event, eventData) => {
            if (!this.mounted) return;
            if (event === EVENTS.FOCUS) {
                const newFocus = eventData === this.props.name;
                if (!this.state.focus && newFocus) {
                    this.setState({ focus: true });
                    this.props.onFocus?.();
                }
                if (this.state.focus && !newFocus) {
                    this.setState({ focus: false });
                    this.props.inputBus.fireEvent(
                        this.props.group,
                        EVENTS.BLUR,
                        this.props.name
                    );
                    this.props.onBlur?.();
                }
            }
            if (event === EVENTS.INPUT && this.state.focus) {
                this.props.onInput?.(eventData);
            }
            this.props.onEvent?.(event, eventData);
        },
    };

    mounted = false;
    componentDidMount() {
        this.mounted = true;
        this.props.inputBus.subscribe(this.props.group, this.__subscriber);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.props.inputBus.unsubscribe(this.props.group, this.__subscriber);
    }

    focus = () => {
        this.props.inputBus.focus(this.props.group, this.props.name);
    };
    isFocused = () => {
        return this.state.focus;
    };

    render() {
        if (this.props.render) {
            return this.props.render({
                focus: this.focus,
                focused: this.state.focus,
            });
        }
        return this.props.children || null;
    }
}
export default withInputBus(OutputHook);
