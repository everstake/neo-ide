module.exports = function(api) {
  api.cache(true)

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/plugin-proposal-export-default-from '
  ]

  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
  ]

  return {
    presets,
    plugins,
  }
}
