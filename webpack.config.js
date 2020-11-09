const entries = [
    "ThemeEngine",
    "UI/VerticalLayout"
]

module.exports = {
    entry: entries.reduce((o, i) => o[i] = `./src/${i}`, {}),
    output: {
        filename: './[name].js',
        libraryTarget: 'commonjs2'
    },
	resolve: {
		extensions: [".js", ".jsx"],
		modules: ["src"],
		alias: {
     		"self": path.resolve(__dirname, 'src'), // eslint-disable-line
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "stylus-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
        }
        ]
    },
    devtool: "source-map",
    mode: "development"
}