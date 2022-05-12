const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

function initCanisterEnv() {
    let localCanisters, prodCanisters;
    try {
        localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"));
    } catch (error) {
        console.log("No local canister_ids.json found. Continuing production");
    }
    try {
        prodCanisters = require(path.resolve("canister_ids.json"));
    } catch (error) {
        console.log("No production canister_ids.json found. Continuing with local");
    }

    const network = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");

    const canisterConfig = network === "local" ? localCanisters : prodCanisters;

    return Object.entries(canisterConfig).reduce((prev, current) => {
        const [canisterName, canisterDetails] = current;
        prev[canisterName.toUpperCase() + "_CANISTER_ID"] = canisterDetails[network];
        return prev;
    }, {});
}
const canisterEnvVariables = initCanisterEnv();

const isDevelopment = process.env.NODE_ENV !== "production";

const frontendDirectory = "rust_simplifire_assets";

const asset_entry = path.join("src", frontendDirectory, "src", "index.html");

module.exports = {
    target: "web",
    mode: isDevelopment ? "development" : "production",
    entry: "./src/rust_simplifire_assets/src/index.js",
    devtool: isDevelopment ? "source-map" : false,
    optimization: {
        minimize: !isDevelopment,
        minimizer: [new TerserPlugin()],
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        fallback: {
            assert: require.resolve("assert/"),
            buffer: require.resolve("buffer/"),
            events: require.resolve("events/"),
            stream: require.resolve("stream-browserify/"),
            util: require.resolve("util/"),
        },
        alias: {
            components: path.resolve(__dirname, "src/rust_simplifire_assets/src/components/"),
            assets: path.resolve(__dirname, "src/rust_simplifire_assets/assets/"),
            examples: path.resolve(__dirname, "src/rust_simplifire_assets/src/examples/"),
            views: path.resolve(__dirname, "src/rust_simplifire_assets/src/views/"),
        },
    },
    output: {
        filename: "index.js",
        path: path.join(__dirname, "dist", frontendDirectory),
        publicPath: 'auto'
    },

    // Depending in the language or framework you are using for
    // front-end development, add module loaders to the default
    // webpack configuration. For example, if you are using React
    // modules and CSS as described in the "Adding a stylesheet"
    // tutorial, uncomment the following lines:
    module: {
        rules: [
            { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
            { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader',] },
            {
                test: /\.(png|jp(e*)g|gif|ico|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]",
                    outputPath: (url, resourcePath, context) => {
                        // `resourcePath` is original absolute path to asset
                        // `context` is directory where stored asset (`rootContext`) or `context` option

                        // To get relative path you can use
                        // const relativePath = path.relative(context, resourcePath);
                        return path.relative(context, resourcePath);
                    }
                },
            },
            { test: /\.vue$/, loader: "vue-loader" },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, asset_entry),
            filename: "index.html",
            chunks: ["index"],
            cache: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "src", frontendDirectory, "assets", "img"),
                    to: path.join(__dirname, "dist", frontendDirectory, "assets", "img"),
                },
            ],
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development",
            ...canisterEnvVariables,
        }),
        new webpack.ProvidePlugin({
            Buffer: [require.resolve("buffer/"), "Buffer"],
            process: require.resolve("process/browser"),
        }),
    ],
    // proxy /api to port 8000 during development
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/api",
                },
            },
        },
        hot: true,
        watchFiles: [path.resolve(__dirname, "src", frontendDirectory)],
        historyApiFallback: true,
        liveReload: true,
    },
};
