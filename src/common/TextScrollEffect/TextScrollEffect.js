import React from "react";
import classnames from "classnames";

import "./TextScrollEffect.styl";

let updateHandlers = [];
let interval = null;

const addHandler = (handler) => {
    updateHandlers = [...updateHandlers, handler];
    if (!interval) {
        interval = setInterval(() => {
            for (const handler of updateHandlers) {
                handler();
            }
        }, 100);
    }
};

const removeHandler = (handler) => {
    updateHandlers = updateHandlers.filter((x) => x !== handler);
    if (updateHandlers.length === 0 && interval) {
        clearInterval(interval);
        interval = null;
    }
};

class TextScrollEffect extends React.Component {
    spanRef = React.createRef();

    underlap = -20;
    overlap = 20;
    virtualScroll = this.underlap;

    mounted = false;
    update = () => {
        if (!this.mounted) return;
        const span = this.spanRef.current;
        if (span.scrollHeight <= span.clientHeight) return;
        const height = span.scrollHeight - span.clientHeight;

        this.virtualScroll += 3;
        if (this.virtualScroll >= height + this.overlap) {
            this.virtualScroll = this.underlap;
        }

        if (this.virtualScroll < 0) {
            span.scrollTop = 0;
        } else if (this.virtualScroll > height) {
            span.scrollTop = height;
        } else {
            span.scrollTop = this.virtualScroll;
        }
    };

    componentDidMount() {
        this.mounted = true;
        addHandler(this.update);
    }

    componentWillUnmount() {
        this.mounted = false;
        removeHandler(this.update);
    }

    render() {
        return (
            <span className={classnames("TextScrollEffect", this.props.className)} ref={this.spanRef}>
                <span className="TextScrollEffect__text">{this.props.children}</span>
            </span>
        );
    }
}

export default TextScrollEffect;
