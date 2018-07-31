import { postConstants } from '../Constants';
import { postService } from '../Services';
import { alertActions } from './';
import { history } from '../Helpers';

export const postActions = {
    save,
    getAll,
    deletePost,
    getById
};

function save(post) {
    return dispatch => {
        dispatch(request(id));

        postService.save(post)
            .then(
                post => dispatch(success(post)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: postConstants.SAVE_REQUEST, id } }
    function success(post) { return { type: postConstants.SAVE_SUCCESS, post } }
    function failure(id, error) { return { type: postConstants.SAVE_FAILURE, id, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        postService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: postConstants.GET_BY_ID_REQUEST, id } }
    function success(post) { return { type: postConstants.GET_BY_ID_SUCCESS, post } }
    function failure(id, error) { return { type: postConstants.GET_BY_ID_FAILURE, id, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function deletePost(id) {
    return dispatch => {
        dispatch(request(id));

        postService.delete(id)
            .then(
                id => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: postConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: postConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: postConstants.DELETE_FAILURE, id, error } }
}
