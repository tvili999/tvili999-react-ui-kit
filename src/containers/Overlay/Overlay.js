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
    const outsideRef = React.createRef();
    const outsideClick = (e) => {
        if(e.target !== outsideRef.current)
            return;
        overlay.close();
    }

    return (
        <div 
            ref={outsideRef}
            className={classnames("Overlay", overlayClassName)}
            style={styles(
                backgroundColor && { backgroundColor },
                center && {
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            )}
            onClick={outsideClick}
        >
            <div className={classnames("Overlay__content", className)} style={style}>
                {children}
            </div>
        </div>
    )
}

export default withOverlay(Overlay);