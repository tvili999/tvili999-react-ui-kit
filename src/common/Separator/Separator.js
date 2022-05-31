import classnames from "classnames";
import "./Separator.styl";

const Separator = ({ className, ...props }) => (
    <span className={classnames("Separator", className)} {...props} />
);

export default Separator;
