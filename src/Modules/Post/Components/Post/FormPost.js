import React, { Component } from 'react';
import PostService from "./../../Shared/PostService";

import { Auth } from "./../../../../Helpers/Auth";
const auth = new Auth();

class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            post: {},
            isEdit: false
        }
    }

    onChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    componentDidMount() {
        const { params } = this.props.match;
        
        if (typeof params.id != 'undefined') {
            PostService.getPost(params.id).then(res => {
                console.log('get', res.data);
                this.setState({
                    post: res.data,
                    content: res.data.content,
                    isEdit: true
                })
            })
        }
    }

    onSubmitPost = () => {
        const { content, post, isEdit } = this.state;
        const user = auth.enToken();
        
        if (isEdit) {
            post.content = content;
            PostService.updatePost(post).then(res => {
                // console.log('update', res.data);
                this.setState({
                    post: {},
                    isEdit: false
                });
                this.props.history.goBack();
            })
        } else {

            const data = {
                author: user.username,
                content
            }
            PostService.createPost(data).then(res => {
                this.props.history.goBack();
            }).catch(e => console.log(e))
        }
    }

    onCance = () => {
        this.setState({
            content: ""
        })
    }

    render() {
        const { content, isEdit } = this.state;
        return (
            <div className="mt-12 w-8/12">
                <h2 className="font-bold text-lg mb-3">{ isEdit ? 'Cập nhật bài viết' : 'Thêm mới bài viết' }</h2>
                <div className="mb-2">
                    <label className="block mb-2">Tiêu đề</label>
                    <input type="text" name="title" 
                        className="block border-2 border-gray-400 w-full rounded-md px-2 py-2 focus:outline-none"
                        onChange={this.onChange}
                        value={content}
                        />
                </div>
                {/* <div>
                    <label className="block mb-2">Nội dung</label>
                    <textarea name="title" 
                        className="block border-2 border-gray-400 w-full rounded-md px-2 py-2 focus:outline-none"
                    />
                </div> */}
                <div className="mt-8 float-right">
                    <button 
                        className="px-2 py-1 rounded-sm bg-red-400 text-white mr-2"
                        onClick={this.onCance}    
                    >Hủy</button>
                    <button 
                        className="px-2 py-1 rounded-sm bg-green-600 text-white"
                        onClick={this.onSubmitPost}
                    >{ isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
                </div>
            </div>
        );
    }
}

export default FormPost;