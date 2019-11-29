module.exports = {
  runtimeCompiler: true,
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  },
  transpileDependencies: ['vuetify']
}
