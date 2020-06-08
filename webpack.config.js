const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'monitor.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        before(router){
            router.get('/success',(req,res)=>{
                res.json({id:1})
            });
            router.post('/error',(req,res)=>{
                res.sendStatus(500)
            })
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
}