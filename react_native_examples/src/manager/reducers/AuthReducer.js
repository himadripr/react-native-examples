import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS , LOGIN_USER_FAIL, LOGIN_USER} from "../actions/Types";

const INITIAL_STATE = { loading: false, email: '', password: '', user: null, error: ''};

export default (state = INITIAL_STATE, action) => {
    

    switch (action.type) {
        case EMAIL_CHANGED:
            console.log('email_changed. Do it again')
            return { ...state, email: action.payload}; //this line will create a new object. with email property overridden
        case PASSWORD_CHANGED:
            console.log('password_changed. Do it again')
            return { ...state, password: action.payload};  
        case LOGIN_USER_SUCCESS:

            // return {...state, user: action.payload, error: '', loading: false, email: '', password: ''}
            return {...state, ...INITIAL_STATE, user: action.payload}
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed', password: '', loading: false}
        case LOGIN_USER:
            return {...state, loading: true, error: ''}
        
        default:
            return state;
    }
};