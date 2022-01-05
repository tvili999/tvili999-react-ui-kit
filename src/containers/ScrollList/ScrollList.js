import classnames from "classnames";
import styles from "utils/styles";

import "./ScrollList.styl";

const ScrollList = ({ className, gap, style, ...props }) => (
    <div 
        className={classnames("ScrollList", className)}
        style={styles({ gap }, style)}
        {...props}
    />
)

export default ScrollList