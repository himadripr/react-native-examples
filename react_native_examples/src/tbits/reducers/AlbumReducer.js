import { ALBUM_DATA_CHANGED } from "../actions/Types";

const INITIAL_STATE = {albums : []};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALBUM_DATA_CHANGED:
            console.log('album data changed. Do it again')
            console.log(action.payload)
            return { ...state, albums: action.payload}; //this line will create a new object. with albumData property overridden
        
        default:
            return state;
    }
};