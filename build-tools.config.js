module.exports = {
  browser:{
    name: 'collect-your-stuff'
  },
  readme:{
    from: 'dist/**/!(*.min).js'
  },
  typescript:{
    config: 'tsconfig.json',
    enabled: true,
  }
}
