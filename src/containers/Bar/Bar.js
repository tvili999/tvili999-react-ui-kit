import classnames from "classnames";
import { styles } from "utils" 

import "./Bar.styl";

const getAlignment = (align) => {
    if(align == "left") return "flex-start";
    if(align == "right") return "flex-end";
    return align;    
}

export default ({ className, style, align, ...props }) => (
    <div
        className={classnames("Bar", className)}
        style={styles({
            justifyContent: getAlignment(align) || "space-around"
        }, style)}
        {...props}
    />
)