/** @type {import('tailwindcss').Config} */
module.exports = {
  // 只打包 content 匹配文件用到的 class
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
