import React, { Component } from "react";

class MountReport extends Component {
    componentDidMount() {
        this.props.onMount?.();
    }

    componentWillUnmount() {
        this.props.onUnmount?.();
    }

    render() {
        return this.props.children;
    }
}

export default MountReport;