import { SVG_DATA_CHANGED } from "./Types";

export const svgDataChanged = (text) => {
    return {
        type: SVG_DATA_CHANGED,
        payload: text
    };
};