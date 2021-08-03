import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNav: false
        }
    }

    goTo = (url = '') => {
        const { path }  = this.props.match;
        this.props.history.push(`${path}/${url}`);        
    }

    toggle = () => {
        this.setState({
            isNav: !this.state.isNav
        })
    }

    onMouseEnter = () => {
        this.toggle();
    }

    onMouseLeave = () => {
        this.toggle();
    }

    onLogout= () => {
        const { path }  = this.props.match;
        localStorage.removeItem("token")
        // console.log("path", path.replace("app", "login"))
        // this.props.history.push(path.replace("app", "login"));
        window.location.href = path.replace("app", "login");
    }

    render() {
        const { isNav } = this.state;
        return (
            <Fragment>
                <header className="bg-yellow-700">
                    <div className="container px-64 mx-auto">
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
                                <li  className="pl-4 cursor-pointer relative"
                                    onMouseEnter={this.onMouseEnter}
                                    onMouseLeave={this.onMouseLeave}
                                >
                                    <img 
                                    src="https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg" 
                                    className="w-6 rounded-full" 
                                    alt="" />
                                    {
                                       isNav && <ul className="absolute bg-white w-36 top-full right-0 px-2 py-2 shadow-lg rounded-md">
                                            <li onClick={this.onLogout} className="hover:text-green-600">Đăng xuất</li>
                                        </ul>
                                    }
                                    
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </Fragment>
        );
    }
}

export default withRouter(AppHeader);