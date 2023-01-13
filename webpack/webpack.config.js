const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{ //配置css文件
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'], //应保证 loader 的先后顺序：'style-loader' 在前，而 'css-loader' 在后。如果不遵守此约定，webpack 可能会抛出错误。
        }, { //配置图片资源
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        }, { //配置字体文件
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        }, { //配置.csv和.tsv文件
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],
        }, { //配置xml文件
            test: /\.xml$/i,
            use: ['xml-loader'],
        }, { //配置toml文件
            test: /\.toml$/i,
            type: 'json',
            parser: {
                parse: toml.parse,
            },
        }, { //配置yaml文件
            test: /\.yaml$/i,
            type: 'json',
            parser: {
                parse: yaml.parse,
            },
        }, { //配置json5文件
            test: /\.json5$/i,
            type: 'json',
            parser: {
                parse: json5.parse,
            },
        }]
    }
};