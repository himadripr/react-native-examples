// import { SVG_DATA_CHANGED } from "../actions/Types";

// const INITIAL_STATE = {value : {}};

// export default (state = null, action) => {
//     switch (action.type) {
//         case SVG_DATA_CHANGED:
//             console.log('svg data changed. Do it again')
//             return { ...state, value: action.payload}; //this line will create a new object. with svgData property overridden
        
//         default:
//             return state;
//     }
// };

import data from '../data/SvgData.json';

export default () => data;