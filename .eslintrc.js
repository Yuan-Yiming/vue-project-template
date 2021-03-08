module.exports = {
  // 注意，plugins 里别忘了加 vue 选项
  plugins: [
    'vue'
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "vue/html-self-closing": "off",
    "vue/no-parsing-error": [2, {
      "x-invalid-end-tag": false,
    }]
  }
}