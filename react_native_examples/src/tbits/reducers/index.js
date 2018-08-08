import { combineReducers } from "redux";
import SvgReducer from './SvgReducer'
import AlbumReducer from './AlbumReducer';

export default combineReducers({
    svgData : SvgReducer,
    albums : AlbumReducer
});