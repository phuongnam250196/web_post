import React, { Component } from 'react';
import { withRouter, Route, Switch } from "react-router-dom";
import AppHeader from '../AppHeader/AppHeader';
import Post from "./../../../Modules/Post/Post";
import User from "./../../../Modules/User/User";

class App extends Component {
    render() {
        const { path } = this.props.match;
        return (
            <div className="App">
                <AppHeader></AppHeader>
                <div className="container px-40 mx-auto">
                    <Switch>
                        <Route path={`${path}/post`} component={Post} />
                        <Route path={`${path}/user`} component={User} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(App);