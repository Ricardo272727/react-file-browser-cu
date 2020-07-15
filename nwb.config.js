module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FileBrowserCu',
      externals: {
        react: 'React'
      }
    }
  }
}
