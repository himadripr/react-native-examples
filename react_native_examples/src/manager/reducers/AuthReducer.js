import { EMAIL_CHANGED, PASSWORD_CHANGED } from "../actions/Types";

const INITIAL_STATE = { email: '', password: ''};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            console.log('email_changed. Do it again')
            return { ...state, email: action.payload}; //this line will create a new object. with email property overridden
        case PASSWORD_CHANGED:
            console.log('password_changed. Do it again')
            return { ...state, password: action.payload};  
        default:
            return state;
    }
};