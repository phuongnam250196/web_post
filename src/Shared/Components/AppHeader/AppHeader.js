import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";

class AppHeader extends Component {

    goTo = (url = '') => {
        const { path }  = this.props.match;
        this.props.history.push(`${path}/${url}`);        
    }

    render() {
        return (
            <Fragment>
                <header className="bg-yellow-700">
                    <div className="container px-40 mx-auto">
                        <nav className="flex bg-yellow-700 py-4 px-1 justify-between items-center">
                            <div className="hover:text-green-600 font-bold cursor-pointer	text-white"
                                onClick={() => this.goTo('post')}
                            >TPN</div>
                            <ul className="list-none flex">
                                <li className="pl-4 hover:text-green-600 font-bold cursor-pointer text-white"
                                    onClick={() => this.goTo('post/create')}
                                    >Viết bài</li>
                                <li className="pl-4 hover:text-green-600 font-bold cursor-pointer text-white"
                                    onClick={() => this.goTo('post')}
                                >Trang chủ</li>
                                <li className="pl-4 cursor-pointer "><img 
                                    src="https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg" 
                                    className="w-6 rounded-full" 
                                    alt="" /></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </Fragment>
        );
    }
}

export default withRouter(AppHeader);