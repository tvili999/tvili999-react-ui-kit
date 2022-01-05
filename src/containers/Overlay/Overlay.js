import React from "react";
import classnames from "classnames";

import styles from "utils/styles";

import { withOverlays } from "contexts/Overlays/Overlays";

import "./Overlay.styl";

const Overlay = ({ className, center, overlayClassName, backgroundColor, children, style, overlays }) => {
    const outsideRef = React.createRef();
    const outsideClick = (e) => {
        if(e.target !== outsideRef.current)
            return;
        overlays.close();
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

export default withOverlays(Overlay);