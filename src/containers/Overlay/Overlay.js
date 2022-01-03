import React from "react";
import classnames from "classnames";

import { withOverlays } from "contexts/Overlays/Overlays";

import "./Overlay.styl";

const Overlay = ({ className, overlayClassName, backgroundColor, children, overlays }) => {
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
            style={{ backgroundColor }}
            onClick={outsideClick}
        >
            <div className={classnames("Overlay__content", className)}>
                {children}
            </div>
        </div>
    )
}

export default withOverlays(Overlay);