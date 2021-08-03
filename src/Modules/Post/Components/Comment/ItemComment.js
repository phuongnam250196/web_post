import React, { Component } from 'react';
import { Format } from "./../../../../Helpers/Format";
const format = new Format();

class ItemComment extends Component {
    onEditComment = (id) => {
        this.props.onEditComment(id);
    }

    onDeleteComment = (id) => {
        this.props.onDeleteComment(id);
    }
    
    onLike = (id) => {
        console.log("like")
        this.props.onLike(id);
    }

    render() {
        const { comment } = this.props;
        const color = comment.like ? "text-green-600" : "";
        return (
            <div className="mb-6 flex">
                    <img src="https://hc.com.vn/i/ecommerce/media/ckeditor_3087086.jpg" alt="avatar"
                            className="w-12 h-12 rounded-full mt-2" />
                    <div className="ml-4 w-full">
                        <div className="w-full flex justify-between">
                            <h5 className="text-gray-400 mb-1 font-thin"><mark className="bg-white text-green-600 font-normal">{comment.author}</mark> {format.formDate (comment.ctime)}</h5>
                            <div>
                                <svg className="icon icon-drive_file_rename_outline w-4 h-4 inline-block fill-current stroke-current 
                                stroke-0 -mt-0.5 mr-2 cursor-pointer hover:text-green-600"
                                    onClick={(id) => this.onEditComment(comment.id)}
                                >
                                    <use xlinkHref="#icon-drive_file_rename_outline">
                                        <symbol id="icon-drive_file_rename_outline" viewBox="0 0 24 24">
                                        <path d="M11.016 20.016l3.984-4.031h6v4.031h-9.984zM6.188 18l8.672-8.672-1.219-1.219-8.625 8.672v1.219h1.172zM18.422 5.813q0.609 0.609 0.609 1.406t-0.609 1.406l-11.391 11.391h-4.031v-4.078q11.25-11.203 11.391-11.344 0.609-0.609 1.406-0.609t1.406 0.609z" />
                                        </symbol>
                                    </use>
                                </svg>
                                <svg className="icon icon-delete_outline w-4 h-4 inline-block fill-current stroke-current 
                                stroke-0 -mt-0.5 mr-2 cursor-pointer hover:text-green-600" 
                                    onClick={(id) => this.onDeleteComment(comment.id)}
                                >
                                    <use xlinkHref="#icon-delete_outline"><symbol id="icon-delete_outline" viewBox="0 0 24 24">
                                        <path d="M15.516 3.984h3.469v2.016h-13.969v-2.016h3.469l1.031-0.984h4.969zM8.016 9v9.984h7.969v-9.984h-7.969zM6 18.984v-12h12v12q0 0.797-0.609 1.406t-1.406 0.609h-7.969q-0.797 0-1.406-0.609t-0.609-1.406z" />
                                        </symbol>
                                    </use>
                                </svg>

                            </div>
                        </div>
                        <p className="mb-1">{comment.text}</p>
                        <p className="text-gray-400 font-extralight">
                            <span className="mr-3 cursor-pointer text-green-600 text-sm"
                                onClick={(id)=>this.onLike(comment.id)}
                            >Hay</span>
                            <svg 
                                className={`${color} icon icon-thumb_up_alt w-4 h-4 inline-block fill-current stroke-current stroke-0 -mt-0.5 mr-2`}>
                                <use xlinkHref="#icon-thumb_up_alt">
                                    <symbol id="icon-thumb_up_alt" viewBox="0 0 24 24">
                                    <path d="M21.844 12.891l-2.672 6.141q-0.609 0.984-1.734 0.984h-8.109q-0.938 0-1.641-0.703t-0.703-1.641v-7.828q0-0.844 0.609-1.453l6.422-6.375 0.422 0.469q0.563 0.563 0.891 1.219 0.141 0.328 0.094 0.656l-0.938 4.641h5.531q0.797 0 1.383 0.609t0.586 1.406v1.078q0 0.422-0.141 0.797zM2.016 20.016v-11.016h1.969q0.422 0 0.727 0.281t0.305 0.703v9q0 0.422-0.305 0.727t-0.727 0.305h-1.969z" />
                                    </symbol>
                                </use>
                            </svg> {comment.like ? 1 : 0}
                        </p>
                    </div>
                </div>
        );
    }
}

export default ItemComment;