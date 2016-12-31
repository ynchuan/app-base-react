/**
 * Created by lenovo on 2016/4/5.
 */
import {combineReducers} from "redux";
function filter(state = "", action) {
    switch (action.type) {
        case "filter":
            return action.value;
        default:
            return state
    }
}

function items(state = [], action) {
    switch (action.type) {
        case "add":
            return [...state, state.length];
        case "delItem":
            return state.slice(0).splice(action.item - 1, action.item);
        case "delAll":
            return [];
        default:
            return state;
    }
}

function test(state = 123, action) {
    switch (action.type) {
        case "add":
            return [...state, state.length];
        case "delItem":
            return state.slice(0).splice(action.item - 1, action.item);
        case "delAll":
            return [];
        default:
            return state;
    }
}

export default combineReducers({items, filter});
