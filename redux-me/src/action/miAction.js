/**
 * Created by lenovo on 2016/4/5.
 */
export function filter(val) {
    return {
        type: "filter",
        value: val
    }
}

export function delI(item) {
    return {
        type: "delItem",
        item
    }

}


export function add() {
    return {
        type: "add"
    }
}

export function delA() {
    return {
        type: "delAll"
    }
}
