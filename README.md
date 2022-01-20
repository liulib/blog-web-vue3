## 项目介绍

学习vue3的实战项目，基于Typescript，前后时间跨度较大，后台管理页面和前台页面写法不一致。

目前由于使用了@kangc/v-md-editor这个插件的原因无法进行cdn打包，打包体积较大，后续尝试修复。

配套后端项目地址 https://github.com/liulib/blog-api-nestjs

## 项目技术栈

vue3+vue-router4+vuex4+less+ant-design-vue+vite2

## 项目开发环境推荐

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 项目实现功能

前台：

用户的登录

文章浏览

后台：

用户、角色、菜单、文章、分类、标签、评论模块的增删改查。

按钮级的权限控制。

## 项目使用

```
npm i
npm run dev
```

## TODO

- [x] 评论功能
- [x] 归档功能
- [x] 接入github的oauth2登录
- [ ] 各分辨率的适应
- [ ] Http模块的重新封装
- [ ] 优化打包体积
- [ ] 统一风格，修复已知bug
- [ ] 优化代码，写注释