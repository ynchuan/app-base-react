/**
 * Created by lenovo on 2016/3/29.
 */
import {createStore,combineReducers} from "Redux"
import reducers from "../reducer/inputReducer"

const rootReducer=combineReducers(reducers);
const tmp= ((rootReducer)=>{
    return ()=>{
        return createStore(rootReducer);
    }
})(reducers);
export default tmp;

