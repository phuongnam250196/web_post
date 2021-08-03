import React, { Component } from 'react';
import LoginService from "./Shared/LoginService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleValidation() {
        let { username, password } = this.state;
        let errors = {};
        let formIsValid = true;

        // Username
        if (!username) {
            formIsValid = false;
            errors["username"] = "Không được để trống";
        }

        // password
        if (!password) {
            formIsValid = false;
            errors["password"] = "Không được để trống";
        }
        
       
        this.setState({
            errors: errors,
        });
        return formIsValid;
    }

    onSignIn = () => {
        const { username, password } = this.state;
        const data = {
            username,
            password
        }
        const check = this.handleValidation();
        if (check) {
            console.log("THông tin đầy đủ");
            LoginService.loginUser(data).then(res => {
                // console.log("res data", res.data)
                if (res.data.accessToken !== "null") {
                    localStorage.setItem('token', res.data);
                    window.location.href = "http://localhost:3000/app/post"
                    // this.props.history.push('app/post')
                    // console.log(res.data);
                }
                // this.props.onLogin(true);
            }).catch(e => console.log(e))
        } else {
            console.log("Bạn chưa nhập đầy đủ thông tin.");

        }
    }

    render() {
        const { username, password, errors } = this.state;
        return (
            <div className="flex justify-center">
                <div className="w-1/3 p-4 rounded-md border-2 border-green-600 mt-40">
                    <h3 className="font-bold uppercase mb-2">Đăng nhập tài khoản</h3>
                    <div className="mb-4">
                        <label  className="block mb-1">Tài khoản</label>
                        <input type="text" 
                            name="username"
                            className="w-full px-2 py-1 rounded-md focus:outline-none border-2 border-gray-400 focus:border-green-500"
                            onChange={this.onChange}
                            value={username}
                        />
                        <p className="text-xs text-red-400 italic absolute">{errors.username}</p>
                    </div>
                    <div className="mb-4">
                        <label  className="block mb-1">Mật khẩu</label>
                        <input type="password"
                            name="password" 
                            className="w-full px-2 py-1 rounded-md focus:outline-none border-2 border-gray-400 focus:border-green-500"
                            onChange={this.onChange}
                            value={password}
                        />
                        <p className="text-xs text-red-400 italic absolute">{errors.password}</p>
                    </div>
                    <div className="mt-8 text-center">
                        <button 
                            className="px-3 py-2 rounded-md bg-green-600 text-white"
                            onClick={this.onSignIn}    
                        >Đăng nhập</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;