/**
 * Created by lenovo on 2016/3/29.
 */
export default function change(state, action) {
    if (action.type == "change") {
        return {value: action.value}
    }
    return {value: 'default'}

}
