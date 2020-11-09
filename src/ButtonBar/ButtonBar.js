import React from "react";
import classnames from "classnames";

import "./ButtonBar.styl";

export default ({ left, center, right, between, around, stretch, children }) => (
    <div className={classnames("ButtonBar", {
        "ButtonBar--left": left,
        "ButtonBar--center": center,
        "ButtonBar--right": right,
        "ButtonBar--between": between,
        "ButtonBar--around": around,
        "ButtonBar--stretch": stretch,
    })}>
        {children}
    </div>
)