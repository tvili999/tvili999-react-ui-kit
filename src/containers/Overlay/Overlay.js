import React from "react";
import classnames from "classnames";

import styles from "utils/styles";

import { withOverlay } from "contexts/Overlays/Overlays";

import "./Overlay.styl";

const Overlay = ({
    className,
    center,
    overlayClassName,
    backgroundColor,
    children,
    style,
    overlay,
}) => {
    const outsideRef = React.useRef();

    const downHere = React.useRef(false);

    const outsideUp = (e) => {
        if (!downHere.current) return;
        downHere.current = false;
        if (e.target !== outsideRef.current) return;
        overlay.close();
    };
    const outsideDown = (e) => {
        if (e.target !== outsideRef.current) return;
        downHere.current = true;
    };

    return (
        <div
            ref={outsideRef}
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
            onMouseUp={outsideUp}
            onMouseDown={outsideDown}
        >
            <div
                className={classnames("Overlay__content", className)}
                style={style}
            >
                {children}
            </div>
        </div>
    );
};

export default withOverlay(Overlay);
