import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {
    isLoading: true, //true because dishes is an empty array
    errMess: null, //if fetching didn't work
    promotions: [] //filled by addDishes, action) =>
}, action) => {
    switch(action.type){

        case ActionTypes.ADD_PROMOS:
            return{...state, isLoading:false, errMess: null, promotions: action.payload} // still immutable

        case ActionTypes.PROMOS_LOADING:
            return{...state, isLoading:true, errMess: null, promotions: []} // still immutable
            
        case ActionTypes.PROMOS_FAILED:
            return{...state, isLoading:false, errMess: action.payload} // still immutable
                 
        default:
            return state;
    }
}