const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const tsImportPluginFactory = require( 'ts-import-plugin' );
const isEnvProduction = process.env.NODE_ENV === "production";


const autoprefixer = require( 'autoprefixer' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );
const InterpolateHtmlPlugin = require( 'react-dev-utils/InterpolateHtmlPlugin' );
const WatchMissingNodeModulesPlugin = require( 'react-dev-utils/WatchMissingNodeModulesPlugin' );
const ModuleScopePlugin = require( 'react-dev-utils/ModuleScopePlugin' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const getClientEnvironment = require( './env' );
const paths = require( './paths' );
const TsconfigPathsPlugin = require( 'tsconfig-paths-webpack-plugin' );
// const tsImportPluginFactory = require( 'ts-import-plugin' );
const packagejson = require( './package.json' );

module.exports = {
    // mode: isEnvProduction ? "production" : "development",
    devtool: "cheap-module-source-map",
    entry: "./src/index.tsx",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },
    devServer: {
        inline: true,
        contentBase: "./public",
        port: 3000,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },


    module: {
        rules: [
            {
                test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
                loader: require.resolve( 'url-loader' ),
                options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            {test: /\.ts|\.tsx$/,
            include: "/",
            use: [ {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
                getCustomTransformers: () => ( {
                  before: [ tsImportPluginFactory( {
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: true,
                  } ) ]
                } )
              },
            }, ],
          },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },
            {
                test: /\.css$/,
                use: ["css-hot-loader", "style-loader", "css-loader"],
            },

            {  test: /\.(less)$/,
                use: [
                    require.resolve( "style-loader" ),
                    {
                        loader: require.resolve( "css-loader" ),
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: require.resolve( "postcss-loader" ),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: "postcss",
                            plugins: () => [
                                require( "postcss-flexbugs-fixes" ),
                                // autoprefixer( {
                                //     browsers: [
                                //         ">1%",
                                //         "last 4 versions",
                                //         "Firefox ESR",
                                //         "not ie < 9", // React doesn't support IE8 anyway
                                //         "Chrome >= 35",
                                //         "Safari >= 7.1",
                                //         "Firefox >= 31",
                                //         "Opera >= 12",
                                //     ],
                                //     flexbox: "no-2009",
                                // } ),
                            ],
                        },
                    },
                    {
                        loader: require.resolve( "less-loader" ), // compiles Less to CSS
                        options: {
                            // modifyVars: packagejson.maintheme,
                            javascriptEnabled: true,
                        },
                    },
                ]},
        ],
    },
    externals: {
        "Config": JSON.stringify(isEnvProduction ? require("./config.prod.json") : require("./config.dev.json")),
    },
    plugins: [
        new MonacoWebpackPlugin(),
        new HtmlWebPackPlugin({
            title: "Neo IDE",
            template: "./public/index.html",
            filename: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        ...(isEnvProduction ? [new UglifyJsPlugin()] : []),
        // new CopyPlugin([{ from: "./public/", to: "./", toType:"dir" }]),
    ],
};
