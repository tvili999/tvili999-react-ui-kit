import React from "react";
import classnames from "classnames";

import styles from "utils/styles";

import { withOverlay } from "contexts/Overlays/Overlays";

import "./Overlay.styl";

class Overlay extends React.Component {
    __outsideRef = React.createRef();

    close = () => {
        this.props.overlay.close();
    };

    __downHere = false;

    __outsideUp = (e) => {
        if (!this.__downHere) return;
        this.__downHere = false;
        if (e.target !== this.__outsideRef.current) return;
        this.close();
    };
    __outsideDown = (e) => {
        if (e.target !== this.__outsideRef.current) return;
        this.__downHere = true;
    };

    render() {
        const {
            className,
            center,
            overlayClassName,
            backgroundColor,
            children,
            style,
            overlay,
        } = this.props;

        return (
            <div
                ref={this.__outsideRef}
                className={classnames("Overlay", overlayClassName)}
                style={styles(
                    backgroundColor && { backgroundColor },
                    center && {
                        display: "flex",
                        flexFlow: "row nowrap",
                        alignItems: "center",
                        justifyContent: "center",
                    }
                )}
                onMouseUp={this.__outsideUp}
                onMouseDown={this.__outsideDown}
            >
                <div
                    className={classnames("Overlay__content", className)}
                    style={style}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default withOverlay.forwardRef(Overlay);
