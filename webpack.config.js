const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

const PUBLIC_PATH = "/code-around-us";

const supportedVisualizations = [
    {
        id: "astar",
        name: "A* algoritm"
    },
    {
        id: "dijkstra",
        name: "Dijkstra's algoritm"
    },
    {
        id: "game-of-life",
        name: "Game of life"
    },
    {
        id: "atom-model",
        name: "Atom model"
    }
];

function getEntries() {
    const visualizationEntries = supportedVisualizations.reduce((prev, curr) => {
        prev[curr.id] = path.resolve(`./src/visualizations/${curr.id}/index.js`);
        return prev;
    }, {});
    visualizationEntries.index = path.resolve("./src/index.js");
    return visualizationEntries;
}

function getHtmlPlugins() {
    // visualization detail pages
    const htmlPlugins = supportedVisualizations.map(sv => new HtmlWebpackPlugin({
        template: path.resolve("./src/templates/visualizationDetail.pug"),
        filename: `${sv.id}/index.html`,
        title: `${sv.name}`,
        publicPath: PUBLIC_PATH,
        templateParameters: {
            visualizationId: sv.id,
            visualizationText: fs.readFileSync(`./src/visualizations/${sv.id}/_text.txt`, "utf-8")
        },
        inject: false
    }));

    // home page
    htmlPlugins.push(new HtmlWebpackPlugin({
        template: path.resolve("./src/templates/index.pug"),
        filename: "index.html",
        title: "Code around us",
        publicPath: PUBLIC_PATH,
        templateParameters: {
            visualizations: supportedVisualizations
        },
        inject: false
    }));

    return htmlPlugins;
}

const config = {
    entry: getEntries(),
    output: {
        path: path.resolve("./dist"),
        filename: (a, b) => {
            return a.chunk.name === "index" ? "index.js" : "[name]/index.js";
        },
        clean: true,
        publicPath: PUBLIC_PATH
    },
    module: {
        rules: [
            // pug loader
            {
                test: /\.pug$/,
                use: ["pug-loader"]
            },
            // image loader
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ["file-loader"]
            },
            // css loader
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
    plugins: getHtmlPlugins()
}; 


module.exports = (_, argv) => {
    if (argv.mode === "development") {
        config.devtool = "inline-source-map";
        config.devServer = {
            static: path.resolve("./dist"),  
            open: [PUBLIC_PATH] 
        };
    }
    return config;
};