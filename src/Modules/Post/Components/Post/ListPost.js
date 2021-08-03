import React, { Component, Fragment } from 'react';
import PostService from "./../../Shared/PostService";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Format } from "./../../../../Helpers/Format";

import { Auth } from "./../../../../Helpers/Auth";
const auth = new Auth();

const format = new Format();

class ListPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: {}
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const user = auth.enToken();

        PostService.listPost().then(res => {
            // console.log('data', res.data, user)
            this.setState({
                data: res.data,
                user
            })
        })
    }
    
    goTo = (url = '') => {
        const { path } = this.props.match;
        this.props.history.push(`${path}/${url}`);
        
    }

    onDeletePost = (id) => {
        const { data } = this.state;
        console.log(id);
        let pos = -1;
        for (let i in data) {
            if (data[i].id === id) {
                pos = i;
            }
        }
        if (pos > -1) {
            // console.log('id deltea', id, pos);
            data.splice(pos, 1);
            confirmAlert({
                title: 'Xóa bài viết',
                message: 'Bạn có chắc chắn muốn xóa không.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            // console.log('id deltea', id);
                            PostService.deletePost(id).then(res=> {
                                this.setState({
                                    data
                                })
                            })
                        }
                  },
                  {
                    label: 'No',
                    onClick: () => console.log("Hủy")
                  }
                ]
            });
        }
    }

    render() {
        const { data, user } = this.state;
        const showPost = data.map((dat, index) => {
            return (
                <div key={index} className="flex justify-between border-b-2 border-gray-300 py-4">
                    <div className="w-2/12">
                        <img src="https://hc.com.vn/i/ecommerce/media/ckeditor_3087086.jpg" alt="avatar"
                            className="w-16 h-16 rounded-full" />
                    </div>
                    <div className="w-8/12 pl-1">
                        <h4 
                            className="font-bold text-lg text-green-600 hover:text-green-400 cursor-pointer"
                            onClick={()=>this.goTo(`detail/${dat.id}`)}
                        >{dat.content}</h4>
                        <p className="text-gray-500 text-justify mb-2">Cụm 3 camera sau bao gồm camera góc rộng, camera Tele chuyên để chụp chân dung, camera Ultra Wide cho góc chụp siêu rộng.</p>
                        <div className="text-sm text-gray-600"><span className="text-green-700 font-bold text-sm">{dat.author}</span> viết {format.formDate(dat.ctime)}</div>
                        {/* { (user.username === dat.author) && 
                            <div className="pt-3">
                                <span 
                                    className="text-sm text-white bg-blue-400 rounded-md px-2 py-1 mr-1 cursor-pointer"
                                    onClick={(id)=>this.goTo(`update/${dat.id}`)}
                                >Sửa</span>
                                <span 
                                    className="text-sm text-white bg-red-400 rounded-md px-2 py-1 cursor-pointer"
                                    onClick={(id)=>this.onDeletePost(dat.id)}
                                    >Xóa</span>
                            </div>
                        } */}
                    </div>
                    <div className="w-2/12 pl-2 pt-1">
                        <span className="text-xs text-gray-600 float-right">
                            {dat.comments.length} <svg className="icon icon-textsms w-3.5 h-3.5 inline-block fill-current stroke-current stroke-0 mt-0">
                                <use xlinkHref="#icon-textsms">
                                    <symbol id="icon-textsms" viewBox="0 0 24 24">
                                    <path d="M17.016 11.016v-2.016h-2.016v2.016h2.016zM12.984 11.016v-2.016h-1.969v2.016h1.969zM9 11.016v-2.016h-2.016v2.016h2.016zM20.016 2.016q0.797 0 1.383 0.586t0.586 1.383v12q0 0.797-0.586 1.406t-1.383 0.609h-14.016l-3.984 3.984v-18q0-0.797 0.586-1.383t1.383-0.586h16.031z" />
                                    </symbol>
                                </use>
                            </svg>
                        </span>
                    </div>
                </div>
            );
        })
        return (
            <Fragment>
                <div className="flex mt-16">
                    <div className="md:w-8/12 pr-8">
                        <h4 className="text-black-400 text-2xl uppercase mb-6 font-bold">Bài viết mời nhất</h4>
                        <div className="list">
                            { showPost }
                        </div>
                    </div>
                    <div className="md:w-4/12 px-8">
                        <div className="flex pb-4 border-b-2 border-gray-300">
                            <div className="w-1/2">
                                <img src="https://hc.com.vn/i/ecommerce/media/ckeditor_3087086.jpg" alt="avatar"
                                        className="w-24 h-24 rounded-full m-auto" />
                            </div>
                            <div className="w-1/2 flex items-center">
                                <div>
                                    <h4 className="font-bold text-md text-green-600 mb-1">Admin</h4>
                                    <ul className="list-none text-xs">
                                        <li><span className="font-bold text-green-700">0</span> bài viết</li>
                                        <li><span className="font-bold text-green-700">0</span> người theo dõi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="border-b-2 border-gray-300 py-4">
                            <h4 className="mb-2 font-bold text-gray-600">Chủ đề hiện tại</h4>
                            <div className="flex flex-wrap">
                                <span className="text-sm text-gray-700 bg-gray-400 rounded-md px-2 py-1 mr-1 mb-1 cursor-pointer">HTML</span>
                                <span className="text-sm text-gray-700 bg-gray-400 rounded-md px-2 py-1 mr-1 mb-1 cursor-pointer">Css</span>
                                <span className="text-sm text-gray-700 bg-gray-400 rounded-md px-2 py-1 mr-1 mb-1 cursor-pointer">Javascript</span>
                                <span className="text-sm text-gray-700 bg-gray-400 rounded-md px-2 py-1 mr-1 mb-1 cursor-pointer">Php</span>
                                <span className="text-sm text-gray-700 bg-gray-400 rounded-md px-2 py-1 mr-1 mb-1 cursor-pointer">Django</span>
                                <span className="text-sm text-gray-700 bg-gray-400 rounded-md px-2 py-1 mr-1 mb-1 cursor-pointer">jquery</span>
                                <span className="text-sm text-gray-700 bg-gray-400 rounded-md px-2 py-1 mr-1 mb-1 cursor-pointer">caching</span>
                            </div>
                        </div>
                        <div className="py-4">
                            <h4 className="mb-2 font-bold text-gray-600">Bài viết khác</h4>
                            <ul>
                                <li>Bài viết 1</li>
                                <li>Bài viết 2</li>
                                <li>Bài viết 3</li>
                                <li>Bài viết 4</li>
                                <li>Bài viết 5</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ListPost;