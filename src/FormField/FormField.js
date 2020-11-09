import React from "react";

import "./FormField.styl"

export default ({ label, children }) => (
    <div className="FormField">
        <p className="FormField__label">{label}</p>
        <div className="FormField__content">
            {children}
        </div>
    </div>
)