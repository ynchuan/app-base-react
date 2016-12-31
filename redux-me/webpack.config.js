var path = require('path');

module.exports={
    entry:{
        "app":"./src/app",
        "app-mi":"./src/app-mi"
    },
    output:{
        filename:"[name]-bundle.js"
    },
    module:{
        loaders:[{
            test:/\.js?$/,
            exclude:/node_modules/,
            loader:"babel",
            query:{
                presets:[
                    "react","es2015"
                ]
            }
        }]
    }
}
