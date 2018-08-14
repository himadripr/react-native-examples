import { EMPLOYEE_UPDATE } from "../actions/Types";


const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case EMPLOYEE_UPDATE:
            //[action.payload.prop]:action.payload.value  is called key interploation
            //In this way multiple actions can be handled with single action
            return {...state, [action.payload.prop]:action.payload.value};
        default:
            return state;
    }
}