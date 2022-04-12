const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

const devServer = (isDev) =>
    !isDev
        ? {}
        : {
              devServer: {
                  open: true,
                  hot: true,
                  port: 8080,
              },
          };

module.exports = ({ develop }) => ({
    mode: develop ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: './styles/main.css',
        }),
        // new CspHtmlWebpackPlugin({
        //     'object-src': "'none'",
        //     'base-uri': "'self'",
        //     'script-src': [
        //         "'unsafe-inline'",
        //         "'self'",
        //         "'unsafe-eval'",
        //         "'http://mc.yandex.ru'",
        //     ],
        //     'worker-src': ["'self'", 'blob:'],
        //     // 'base-uri': "'self'",
        //     // 'object-src': "'none'",
        //     // 'default-src': "'self'",
        //     // 'script-src-elem': "'self'",
        //     // 'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
        //     // 'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
                type: 'asset/inline',
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    ...devServer(develop),
});
