import React, { Component } from "react";

const { Consumer, Provider } = React.createContext();

export class PagesContainer extends Component {
    state = {
        pages: [],
        pageParams: null,
        open: (render, params) => {
            const page = {
                render,
                close: (params) => {
                    this.setState({
                        pages: this.state.pages.filter(x => x !== page),
                        pageParams: params
                    })
                }
            }
            this.setState({
                pages: [...this.state.pages, page],
                pageParams: params
            })

            return page;
        },
        openComponent: (Component, props, params) => {
            this.state.open(page => <Component page={page} {...props}/>, params);
        },
        render: () => {
            if(this.state.pages.length == 0)
                return null;
            const page = this.state.pages[this.state.pages.length - 1];
            return page?.render?.({
                pageParams: this.state.pageParams,
                close: page?.close
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
