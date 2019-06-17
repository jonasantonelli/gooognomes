// eslint stylecode based on https://github.com/airbnb/javascript

module.exports = {
    parser: 'babel-eslint',
    extends: [
        './react',
        './best-practices',
        './error',
        './variables',
        './es6',
        './import',
        './strict',
        './variables'
    ].map(require.resolve),
    parserOptions: {
        allowImportExportEverywhere: true,
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    }
};
