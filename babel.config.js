module.exports = {
    presets: [
      "module:metro-react-native-babel-preset",
      "@babel/preset-react" // Ajout du preset pour JSX
    ],
    plugins: [
      "react-native-reanimated/plugin" // Pour react-native-reanimated si utilisé
    ]
  };
  