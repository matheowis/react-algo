const path = require('path');

module.exports = {
    mode:'development',
    entry: {
        bundle: ['./src/app.js'],
    },
    context: path.resolve(__dirname, "."),// nie wiem co to jest
    output: {
        path: path.join(__dirname, 'public'),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devServer: {
        // https: false,
        contentBase: path.join(__dirname, 'public'),
        port: 9090
    }
}