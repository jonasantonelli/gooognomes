module.exports = {
  "ignore": [
    "node_nodules/**/*"
  ],
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env", {
       "useBuiltIns": "entry",
       "corejs": 3
     }
   ]
  ],
  "plugins": [

    "lodash",
    ["@babel/plugin-transform-spread", {
      "loose": true
    }],
    "dynamic-import-node",
    "@babel/plugin-syntax-dynamic-import"
  ]
}
