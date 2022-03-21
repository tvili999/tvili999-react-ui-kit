import React from "react";

class GlobalEvent extends React.Component {
    handleEvent = (e, ...props) => {
        if (this.props.preventDefault) e.preventDefault();

        this.props.onEvent?.(e, ...props);
    };

    componentDidMount() {
        window.addEventListener(this.props.event, this.handleEvent);
    }

    componentWillUnmount() {
        window.removeEventListener(this.props.event, this.handleEvent);
    }

    render() {
        return this.props.children || null;
    }
}

export default GlobalEvent;
