import typescript from "rollup-plugin-typescript2";

export default {
  input: "./main.ts",
  
  plugins: [
    typescript()
  ],
  
  output: {
    format: "es",
    file: "../campus-auto-login.user.js"
  },

  watch: {
    exclude: ["node_modules/**"]
  }
};
