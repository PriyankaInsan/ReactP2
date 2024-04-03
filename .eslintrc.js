module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
    "node": true,
    "commonjs": true
  },
  settings: {
    react: {
      "version": "detect"
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    // "indent": [
    //   "error",
    //   2,
    // ],
    "max-len": [1, { code: 150 }],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/prop-types": [1],
    "no-unused-vars": [1],
    "no-undef": [1],
    "react/jsx-key": [1],

  }
};
