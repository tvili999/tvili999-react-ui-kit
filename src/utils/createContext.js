import React, { Component } from "react";
import compose from "./compose"

export default (name, callback, ...hocs) => {
    name = name[0].toUpperCase() + name.substr(1);
    let lowerName = name[0].toLowerCase() + name.substr(1);

    const { Provider, Consumer } = React.createContext();

    class StatefulProvider extends Component {
        displayName = `${name}Provider`
           
        constructor(props) {
            super(props);

            this.state = callback.call(this, this);
        }

        onMount = []
        addOnMount = (handler) => this.onMount = [...this.onMount, handler];
        removeOnMount = (handler) => this.onMount = this.onMount.filter(x => x !== handler);

        componentDidMount() {
            this.onMount.forEach(x => x());
        }

        onUnmount = []
        addOnUnmount = (handler) => this.onUnmount = [...this.onUnmount, handler];
        removeOnUnmount = (handler) => this.onUnmount = this.onUnmount.filter(x => x !== handler);

        componentWillUnmount() {
            this.onUnmount.forEach(x => x());
        }
    
        render() {
            return (
                <Provider value={this.state}>
                    {this.props.children}
                </Provider>
            )
        }
    }

    if(hocs?.length !== 0)
        StatefulProvider = compose(...hocs)(StatefulProvider);
    
    const withContext = (Component) => {
        const hoc = (props) => (
            <Consumer>
                {context => (
                    <Component {...{
                        [lowerName]: context,
                        ...props,
                    }} />
                )}
            </Consumer>
        )
        hoc.displayName = `with${name}()`;
    
        return hoc;
    }
    
    return {
        [`${name}Provider`]: StatefulProvider,
        [`${name}Consumer`]: Consumer,
        [`with${name}`]: withContext
    }
}

