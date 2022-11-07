const isDev = process.env.NODE_ENV === 'development';
const basePlugins = [
  "@babel/plugin-proposal-class-properties",
  [
      "@babel/plugin-transform-runtime",
      {
          "corejs": false,
          "helpers": true,
          "regenerator": false
      }
  ],
  'dynamic-import-node'
]
const plugins = isDev ? basePlugins.push('react-refresh/babel') : basePlugins;
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
          "corejs": 3,
          "useBuiltIns": "usage"
      }
  ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: plugins,
}