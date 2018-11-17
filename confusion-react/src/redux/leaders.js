import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
    isLoading: true, //true because dishes is an empty array
    errMess: null, //if fetching didn't work
    leaders: [] //filled by addDishes
}, action) =>
{
    switch(action.type){
        case ActionTypes.ADD_LEADERS:
        var leader = action.payload;
        leader.id = state.leaders.length;
        leader.date = new Date().toISOString();
        return{...state, isLoading:false, errMess: null, leaders: action.payload} // still immutable

    case ActionTypes.LEADERS_LOADING:
        return{...state, isLoading:true, errMess: null, leaders: []} // still immutable
        
    case ActionTypes.LEADERS_FAILED:
        return{...state, isLoading:false, errMess: action.payload, leaders: []} // still immutable 
    
    default:
        return state;
    }
}