//default value of state is set as null
export default (state = null, action) => {
    // console.log(action);
    // return null; //reducer cannot return an undefined
    switch (action.type){
        case 'select_library':
            return action.payload;
        default:
            return state;
    }
} 