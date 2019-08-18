module.exports = function (api) {
	api.cache(true);

	const presets = [
		'airbnb',
		'@babel/preset-env',
		'@babel/preset-react',
	];
	const plugins = [
		'@babel/syntax-dynamic-import',
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread',
		'@babel/proposal-export-default-from',
		'@babel/proposal-export-namespace-from',
		'@babel/transform-classes',
	];

	return {
		presets,
		plugins
	};
}