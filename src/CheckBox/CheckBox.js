import React from "react";
import classnames from "classnames";

import "./CheckBox.js";

export default ({ renderBox, label, checked, onChange }) => (
    <div className="CheckBox">
        <input
            type="checkbox"
            className={classnames("CheckBox__input", {
                "CheckBox__input--visible": !renderBox
            })}
            checked={checked}
            onClick={() => onChange?.(!checked)}
        />
        {renderBox && (
            <div className="CheckBox__box" onClick={() => onChange?.(!checked)}>
                {renderBox(checked)}
            </div>
        )}
        {label && (
            <p className="CheckBox__label" onClick={() => onChange?.(!checked)}>{label}</p>
        )}
    </div>
)