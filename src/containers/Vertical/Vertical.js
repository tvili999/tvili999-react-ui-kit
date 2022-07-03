import classnames from "classnames";
import { styles } from "utils";

import "./Vertical.styl";

const getAlignment = (align) => {
    if (align == "top") return "flex-start";
    if (align == "bottom") return "flex-end";
    return align;
};

export default ({ className, style, scroll, gap, align, ...props }) => (
    <div
        className={classnames("Vertical", className)}
        style={styles(
            {
                justifyContent: getAlignment(align),
                gap: typeof gap === "number" ? gap + "px" : typeof gap === "string" ? gap : "12px",
            },
            scroll && {
                overflow: "auto",
            },
            style
        )}
        {...props}
    />
);
