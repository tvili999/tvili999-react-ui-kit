import React from "react";

import "./Form.styl"

export default ({ children, onSubmit }) => (
    <form onSubmit={onSubmit}>
        {children}
    </form>
)