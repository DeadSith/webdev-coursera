import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMess: null,
    comments: [],
}, action) =>
{
    switch(action.type)
    {
        case ActionTypes.ADD_COMMENTS:
            return{...state, errMess: null, comments: action.payload}; // still immutable
        
            case ActionTypes.COMMENTS_FAILED:
            return{...state, errMess: action.payload}; // still immutable
         
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)}; // concat is an immutable operator.
        default:
            return state;
    }
}