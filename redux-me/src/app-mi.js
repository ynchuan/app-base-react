/**
 * Created by lenovo on 2016/4/5.
 */
import React from "react";
import {Provider} from "react-redux";
import Main from './component/mi/main';
import miCreateStore from "./store/miCreateStore";

React.render(
    <Provider store={miCreateStore}>
        <Main/>
    </Provider>,
    document.getElementById("app")
);
