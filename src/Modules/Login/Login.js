import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="flex justify-center">
                <div className="w-1/3 p-4 rounded-md border-2 border-green-600 mt-40">
                    <h3 className="font-bold uppercase mb-2">Đăng nhập tài khoản</h3>
                    <div className="mb-3">
                        <label  className="block mb-1">Tài khoản</label>
                        <input type="text" 
                            className="w-full px-2 py-1 rounded-md focus:outline-none border-2 border-gray-400 focus:border-green-500"
                        />
                    </div>
                    <div className="mb-3">
                        <label  className="block mb-1">Mật khẩu</label>
                        <input type="password" 
                            className="w-full px-2 py-1 rounded-md focus:outline-none border-2 border-gray-400 focus:border-green-500"
                        />
                    </div>
                    <div className="mt-8 text-center">
                        <button className="px-3 py-2 rounded-md bg-green-600 text-white">Đăng nhập</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;