import React from "react";
import OutputHook from "./OutputHook";

const Output = React.forwardRef(
    ({ children, value, onChange, inputProcessor, ...props }, ref) => (
        <OutputHook
            ref={ref}
            onInput={(eventData) => {
                onChange?.(inputProcessor?.(value, eventData));
            }}
            render={children}
            {...props}
        />
    )
);
export default Output;
