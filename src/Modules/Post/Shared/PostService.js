import { Http } from "./../../../Helpers/Http";

const API_ENDPOINT = {
  LIST_POST: '/post/post/list',
  CREATE_POST: '/post/post/create',
  UPDATE_POST: '/post/post/update',
  DELETE_POST: '/post/post/delete',
  GET_POST: '/post/post/get',
  LIST_COMMENT: '/comment/comment/list',
  CREATE_COMMENT: '/comment/comment/create',
  UPDATE_COMMENT: '/comment/comment/update',
  DELETE_COMMENT: '/comment/comment/delete',
}

class PostService {
  constructor() {
    if (PostService._instance) {
      return PostService._instance;
    }
    PostService._instance = this;
  }


  //LIST PRODUCT
  listPost() {
    return Http.get(API_ENDPOINT.LIST_POST);
  }

  // CREATE
  createPost(data) {
    return Http.post(API_ENDPOINT.CREATE_POST, data);
  }

  // UPDATE
  updatePost(data) {
    return Http.post(`${API_ENDPOINT.UPDATE_POST}?id=${data.id}`, data);
  }

  // GET
  getPost(id) {
    return Http.get(API_ENDPOINT.GET_POST, {id});
  }

  // DELETE
  deletePost(id) {
    return Http.get(API_ENDPOINT.DELETE_POST, {id});
  }

  //LIST COMMENT
  listComment() {
    return Http.get(API_ENDPOINT.LIST_COMMENT);
  }
   // CREATE
   createComment(data) {
    return Http.post(API_ENDPOINT.CREATE_COMMENT, data);
  }

  // UPDATE
  updateComment(data) {
    return Http.post(`${API_ENDPOINT.UPDATE_COMMENT}?id=${data.id}`, data);
  }

   // DELETE
   deleteComment(id) {
    return Http.get(API_ENDPOINT.DELETE_COMMENT, {id});
  }


}

const instance = new PostService();
export default instance;
