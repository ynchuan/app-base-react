var path = require('path');

module.exports={
    entry:"./src/app.js" ,
    output:{
        filename:"app-bundle.js"
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
