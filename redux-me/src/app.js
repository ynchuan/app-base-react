import React from "react"
import {Provider} from "react-redux"
import createStore from "./store/inputStore"
import App from "./component/input.react"

const store=createStore();//创建store，包含reduce

React.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("app")
);
