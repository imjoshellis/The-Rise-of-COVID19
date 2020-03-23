module.exports = {
  preprocess: {
    style: async ({ content, attributes }) => {
      if (attributes.type !== 'text/scss') return
      return new Promise((resolve, reject) => {
        resolve({ code: '', map: '' })
      })
    }
  }
}
