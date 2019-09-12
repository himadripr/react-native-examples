import { SVG_DATA_CHANGED, ALBUM_DATA_CHANGED } from "./Types";

export const svgDataChanged = (text) => {
    return {
        type: SVG_DATA_CHANGED,
        payload: text
    };
};

export const albumDataChanged = (text) => {
    return {
        type: ALBUM_DATA_CHANGED,
        payload: text
    };
};