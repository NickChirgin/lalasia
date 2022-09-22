const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const getSettingsForStyles = (hasModules = false, mode) => {
    const isProd = mode === 'production';
    return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader", 
    !hasModules ? "css-loader" : {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: !isProd ? "[path][name]__[local]" : "[hash:base64]",
            }
        }
    }, {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: ['autoprefixer'].filter(Boolean),
            }
        }
    }, "sass-loader"]
}

let config = {
    entry: path.join(srcPath, 'index.tsx'),
    target: 'browserslist',
    devtool: 'eval-source-map',
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new TsCheckerPlugin(),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(svg|png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@components': path.join(srcPath, 'components'),
            '@config': path.join(srcPath, 'config'),
            '@styles': path.join(srcPath, 'styles'),
            '@img': path.join(srcPath, 'assets/img'),
            '@pages': path.join(srcPath, 'pages'),
            '@store': path.join(srcPath, 'store'),
            '@utils': path.join(srcPath, 'utils'),
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true,
        // inline: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "eval-source-map";
        config.target = "web";
    }

    if (argv.mode === "production") {
        config.devtool = "hidden-source-map";
        config.target = "browserslist";
        config.plugins = [...config.plugins, new ReactRefreshWebpackPlugin()];
    }

    config.module.rules = [...config.module.rules,  {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true, argv.mode),
    },
    {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(false, argv.mode),
    },]

    return config;
};