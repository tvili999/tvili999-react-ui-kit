import React from "react";
import { withInputBus, EVENTS } from "./InputBus";

class Input extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.group) throw "No group specified for InputBus Input";
    }

    fireEvent = (eventData) => {
        this.props.inputBus.fireEvent(
            this.props.group,
            EVENTS.INPUT,
            eventData
        );
    };

    componentDidMount() {
        if (this.props.name && this.props.available) {
            this.props.inputBus.registerInput(this.props.name);
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.name) return;
        if (this.props.available !== prevProps.available) {
            if (this.props.available)
                this.props.inputBus.registerInput(this.props.name);
            else this.props.inputBus.unregisterInput(this.props.name);
        }
    }

    componentWillUnmount() {
        if (this.props.name) {
            this.props.inputBus.unregisterInput(this.props.name);
        }
    }

    render() {
        return this.props.children?.(this.fireEvent) || null;
    }
}
export default withInputBus(Input);
