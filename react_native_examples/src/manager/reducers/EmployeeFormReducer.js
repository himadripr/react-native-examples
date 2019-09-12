import { EMPLOYEE_UPDATE, EMPLOYEE_NAME_UPDATE, EMPLOYEE_PHONE_UPDATE, EMPLOYEE_SHIFT_UPDATE } from "../actions/Types";


const INITIAL_STATE = {name: 'Himadri', phone: '91800204808', shift: 'Saturday'}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case EMPLOYEE_UPDATE:
            //[action.payload.prop]:action.payload.value  is called key interploation
            //In this way multiple actions can be handled with single action
            return {...state, [action.payload.prop]:action.payload.value};
        case EMPLOYEE_NAME_UPDATE:
            return {...state, name:action.payload}
        case EMPLOYEE_PHONE_UPDATE:
            return {...state, phone:action.payload}
        case EMPLOYEE_SHIFT_UPDATE:
            return {...state, shift:action.payload}

        default:
            return state;
    }
}