import React from "react";
import { withInputBus, EVENTS } from "./InputBus";

class Input extends React.Component {
    check = () => {
        return this.props.inputBus.inputs.indexOf(this.props.name) !== -1;
    };

    state = {
        available: this.check(),
    };

    constructor(props) {
        super(props);
        if (!this.props.name)
            throw "No name specified for InputBus InputSwitch";
    }

    componentDidUpdate(prevProps) {
        if (this.props.inputBus.inputs !== prevProps.inputBus.inputs) {
            this.setState({
                available: this.check(),
            });
        }
    }

    render() {
        return (this.state.available && this.props.children) || null;
    }
}
export default withInputBus(Input);
