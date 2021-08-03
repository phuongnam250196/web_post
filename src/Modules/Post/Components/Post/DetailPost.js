import React, { Component } from 'react';
import PostService from "./../../Shared/PostService";
import ItemComment from "./../Comment/ItemComment";
import FormComment from "./../Comment/FormComment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Format } from "../../../../Helpers/Format";
import { Auth } from "./../../../../Helpers/Auth";
const auth = new Auth();
const format = new Format();


class DetailPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            post: {},
            text: "",
            id_edit: "",
            user: {}
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const { match } = this.props;
        PostService.listComment().then(res => {
            this.setState({
                comments: res.data
            })
        });

        PostService.getPost(match.params.id).then(res => {
            this.setState({
                post: res.data
            })
        })

        const user = auth.enToken();
        if (user) {
            this.setState({
                user
            })
        }

        // console.log("param id", this.props.match.params.id)
    }

    findIndex(arr, index) {
        let result = -1;
        for (let i in arr) {
            if (arr[i] === index) {
                result = i;
            }
        }
        return result;
    }

    onComment = (text) => {
        const { post, comments, id_edit, user } =  this.state;
        
        if(id_edit) {
            const comment = comments.find(c => {
                return c.id  === id_edit;
            });
            comment.text = text;
            PostService.updateComment(comment).then(res => {
                this.setState({
                    comments,
                    id_edit: "",
                    text: ""
                })
            })
        } else {
            const data = {
                author: user.username,
                text
            }
            PostService.createComment(data).then(res => {
                comments.push(res.data);
                post.comments.push(res.data.id);
                PostService.updatePost(post).then(resPost => {
                    this.setState({
                        comments,
                        post
                    })
                })
                
            })
        }
    }

    onEditComment = (id) => {
        const { comments } = this.state;
        const comment = comments.find(c =>  {
            return c.id === id
        });
        // console.log('c', comment)
        this.setState({
            text: comment.text,
            id_edit: comment.id
        })
    }

    onDeleteComment = (id) => {
        const { comments } = this.state;
        let pos = -1;
        for (let i in comments) {
            if (comments[i].id === id) {
                pos = i;
            }
        }
        if (pos > -1) {
            comments.splice(pos, 1);
            confirmAlert({
                title: 'Xóa bình luận',
                message: 'Bạn có chắc chắn muốn xóa không.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            console.log('id deltea', id);
                            PostService.deleteComment(id).then(res=> {
                                this.setState({
                                    comments
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

    onLike = (id) => {
        const { comments } = this.state;
        const comment = comments.find(c => {
            return c.id  === id;
        });
        console.log("update like", id)
        comment.like = !comment.like;
        PostService.updateComment(comment).then(res => {
            this.setState({
                comments
            })
        })
    }

    render() {
        const { comments, post, text } = this.state;
        // console.log('test', typeof post.comments)
        const showComments = comments.map((comment, index) => {
            if (this.findIndex(post.comments, comment.id) > -1) {
                return (
                    <ItemComment 
                        key={index} 
                        comment={comment}
                        onEditComment={(id)=>this.onEditComment(id)}
                        onDeleteComment={(id)=>this.onDeleteComment(id)}
                        onLike={(id)=>this.onLike(id)}
                    />
                );
            }
        })
        return (
            <div className="flex mt-12">
                <div className="w-8/12">
                    <h1 className="font-bold text-2xl text-green-600 ">{post.content}</h1>
                    <div className="flex items-center py-4">
                        <img src="https://hc.com.vn/i/ecommerce/media/ckeditor_3087086.jpg" alt="avatar"
                                        className="w-6 h-6 rounded-full" />
                        <div className="ml-2 text-gray-500 text-sm">{post.author} viết ngày { format.formDate(post.ctime) }</div>
                    </div>
                    {/* <div>
                        Cụm 3 camera sau bao gồm camera góc rộng, camera Tele chuyên để chụp chân dung, camera Ultra Wide cho góc chụp siêu rộng.
                    </div> */}
                    <div className="py-4">
                        <h4 className="font-bold font-bold text-black-200">Bình luận</h4>
                        <div className="mt-6">
                            { showComments }
                        </div>
                        <div className="flex">
                            <img src="https://hc.com.vn/i/ecommerce/media/ckeditor_3087086.jpg" alt="avatar"
                                        className="w-12 h-12 rounded-full" />
                            <FormComment
                                text={text} 
                                onComment={(text) => this.onComment(text)} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailPost;