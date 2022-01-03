import React, { Component } from "react";

const { Consumer, Provider } = React.createContext();

export class PagesContainer extends Component {
    state = {
        pages: [],
        pageParams: null,
        open: (render, params) => {
            this.setState({
                pages: [...this.state.pages, render],
                pageParams: params
            })
        },
        render: () => {
            if(this.state.pages.length == 0)
                return null;
            const page = this.state.pages[this.state.pages.length - 1];
            return page?.({
                pageParams: this.state.pageParams,
                close: (params) => {
                    this.setState({
                        pages: this.state.pages.filter(x => x !== page),
                        pageParams: params
                    })
                }
            });
        }
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.state.render() || this.props.children({
                    pageParams: this.state.pageParams
                })}
            </Provider>
        )
    }
}

export const withPages = (Component) => {
    const hoc = props => (
        <Consumer>
            {pages => (
                <Component pages={pages} {...props}/>
            )}
        </Consumer>
    )
    hoc.displayName = "withPages()";

    return hoc;
}
