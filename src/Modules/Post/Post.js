import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import ListPost from './Components/Post/ListPost';
import FormPost from './Components/Post/FormPost';
import DetailPost from './Components/Post/DetailPost';

class Post extends Component {
    render() {
        const { path }= this.props.match;
        // const { history } = this.props.history;
        return (
            <div className="Post">
                <Switch>
                    <Route path={`${path}/detail/:id`} component={DetailPost} />
                    <Route path={`${path}/update/:id`} component={FormPost} />
                    <Route path={`${path}/create`} component={FormPost} />
                    <Route path={`${path}`} component={ListPost} />
                </Switch>
            </div>
        );
    }
}

export default Post;