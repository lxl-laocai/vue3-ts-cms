```text
--version
  node v16.13.1
  yarn v1.22.18
  npm  v8.7.0
  @vue/cli v5.0.4
// vue create vue3-ts-cms
```

## .editorconfig 统一代码的风格及样式规范化

```.editorconfig
# https://editorconfig.org/

root = true
[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集 utf-8
indent_style = space # 缩进风格 (tab | space)
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型 (lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件首尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

## .prettierrc 代码格式化

```.prettierrc
// yarn add prettier -D
{
  "useTabs": false, // 使用tab缩进还是空格缩进
  "tabWidth":2, // tab是空格的情况下选择几个空格
  "printWidth": 80, // 当行字符的长度
  "singleQuote": true, // 使用单引号还是双引号, true 单引号
  "trailingComma": "none", // 在多行输入是否添加尾逗号
  "semi": true, // 语末尾是否要加分号, true便是加
  "bracketSpacing": true // 对象中的空格 默认true
}
```

## .prettiernore 代码格式化忽略文件

```.prettiernore
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

## package.json script 中配置脚本一键格式化

```package.json
"script":{
    "prettier":"prettier --write ."
}
```

## eslintrc.js 语法检测

```eslintrc
// yarn add eslint-plugin-prettier eslint-config-prettier -D
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier", //!! 待定
    "@vue/prettier/@typescript-eslint", //!! 待定
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off" // 关闭名称校验
  },
};
```

## git Husky 代码提交仓库 commit 前 自动校验 eslint

```husky
// yarn add husky -D
// npx husky install
// 在.husky下创建 pre-commit

#!/bin/sh
."$(dirname "$0")/_/husky.sh"

npm run lint

// 并在package.json script中添加脚本
"script": {
    "prepare": "husky install"
}
```
