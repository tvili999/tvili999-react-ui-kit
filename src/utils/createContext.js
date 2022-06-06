import React, { Component, useContext } from "react";
import compose from "./compose";

export default (name, callback, ...hocs) => {
    name = name[0].toUpperCase() + name.substr(1);
    let lowerName = name[0].toLowerCase() + name.substr(1);

    const Context = React.createContext();

    class StatefulProvider extends Component {
        displayName = `${name}Provider`;

        constructor(props) {
            super(props);

            this.state = callback.call(this, props);
        }

        onMount = [];
        addOnMount = (handler) => (this.onMount = [...this.onMount, handler]);
        removeOnMount = (handler) =>
            (this.onMount = this.onMount.filter((x) => x !== handler));

        componentDidMount() {
            this.onMount.forEach((x) => x());
        }

        onUnmount = [];
        addOnUnmount = (handler) =>
            (this.onUnmount = [...this.onUnmount, handler]);
        removeOnUnmount = (handler) =>
            (this.onUnmount = this.onUnmount.filter((x) => x !== handler));

        componentWillUnmount() {
            this.onUnmount.forEach((x) => x());
        }

        render() {
            return (
                <Context.Provider value={this.state}>
                    {this.props.children}
                </Context.Provider>
            );
        }
    }

    if (hocs?.length !== 0)
        StatefulProvider = compose(...hocs)(StatefulProvider);

    const withContext = (Component) => {
        const hoc = React.forwardRef((props, ref) => {
            const context = useContext(Context);
            return (
                <Component
                    ref={ref}
                    {...{
                        [lowerName]: context,
                        ...props,
                    }}
                />
            );
        });
        hoc.displayName = `with${name}()`;

        return hoc;
    };

    return {
        [name]: Context,
        [`${name}Provider`]: StatefulProvider,
        [`with${name}`]: withContext,
    };
};
