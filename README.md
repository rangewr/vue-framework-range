# vue-framework-range #


**解决tinymce报错问题**

- 1.package.json文件中找相关的依赖并删除

- 2.dos窗口删除依赖npm uninstall vue-tinymce

- 3.重新下载npm install vue-tinymce


**select标签问题**

- 1.通过将vue版本号从2.3.3换成2.5.2是可以解决

- 2.同时注意更换vue-template-compiler版本号，也要换到2.5.2

- 3.直接在package.json中修改版本号，然后npm install就行了

**表格不显示问题**

- 1.使用dos命令进入到项目目录下,执行npm install qiniu.js

- 2.Table的列设置columns7中,设置第一列的width属性值为20,去掉引号

- 3.修改index.html中引用qiniu.min.js的代码为bower_components/qiniu/src/qiniu.js

- 4.重新执行 npm install -> npm run build:prod

**登录时保存的值**

- 1.登录之后需要动态获取路由,此时需要先保存token

- 2.在src/store/modules/user.js中的LoginByEmail方法中,保存了如下三个值, 这三个值在后期获取动态路由时需要用到,所以在登录成功后必须要保存这三个值

    Cookies.set('Admin-Token', response.data.token);<br>
    commit('SET_TOKEN', data.token);<br>
    commit('SET_EMAIL', email);<br>
    resolve();



[![TeamCity CodeBetter](https://img.shields.io/teamcity/codebetter/bt428.svg)]() [![npm](https://img.shields.io/npm/dw/localeval.svg)]() [![npm](https://img.shields.io/npm/v/npm.svg)]() [![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/nimelepbpejjlbmoobocpfnjhihnpked.svg)]()[![Sourcegraph for Repo Reference Count](https://img.shields.io/sourcegraph/rrc//github.com/gorilla/mux.svg)]()[![GitHub watchers](https://img.shields.io/github/watchers/badges/shields.svg?style=social&label=Watch)]()

**[立即体验(国内)](http://herozhou.coding.me/vue-framework-wz/#/dashboard)**

**[online-website](https://herozhou.github.io/vue-framework-wz/)**

**[Englist Document](https://github.com/herozhou/vue-framework-wz/wiki/English-Document)**

**本项目是后台管理框架，集成了权限管理、登录功能、UI组件、七牛上传等功能，建议直接使用。**
> **注意**：便于前端调试，所以数据请求都是用了mockjs模拟。**在需要请求外部api时请移除mock文件**。

## Features 特性
- **👍wz脚手架👍**（脚手架助你安装/卸载组件更方便）
- **工业化UI组件**（上手即用，无需自己造轮子）
- **自适应布局**（完美适配大中小屏）
- `登录/注销`
- `权限验证`
- **👉多TAB导航**（没有多TAB怎么能称为后台管理界面呢？）
- `Tinymce 编辑器`
- `Markdown 编辑器`
- `动态侧边栏`（支持多级路由）
- 面包屑导航
- JSON展示组件
- echartjs图表
- 404错误页面
- **表格数据直接导出cvs**
- `多环境发布`
- mock数据
- 炫酷hover特效


## Preview 效果图

#### 自适应布局

![自适应布局](https://github.com/herozhou/JAVA-HTML-/blob/master/src/gifs/index.gif)

#### 多TAB效果

![自适应布局](https://github.com/herozhou/JAVA-HTML-/blob/master/src/gifs/tab.gif)

#### 丰富功能表格

![丰富功能表格](https://github.com/herozhou/JAVA-HTML-/blob/master/src/gifs/table.gif)

#### 炫酷登录界面

![炫酷登录界面](https://github.com/herozhou/JAVA-HTML-/blob/master/src/gifs/login.gif)

#### 炫酷图表

![炫酷图表](https://github.com/herozhou/JAVA-HTML-/blob/master/src/gifs/echart.gif)


#### 编辑器

![丰富功能表格](https://github.com/herozhou/JAVA-HTML-/blob/master/src/gifs/editor.gif)



**[更多demo](http://herozhou.coding.me/vue-framework-wz/#/dashboard)**


## 系列教程

[《一步步带你做vue后台管理框架》第一课：介绍框架](http://www.cnblogs.com/herozhou/p/7434931.html)

[《一步步带你做vue后台管理框架》第二课：上手使用](http://www.cnblogs.com/herozhou/p/7441702.html)

[《一步步带你做vue后台管理框架》第三课：登录功能](http://www.cnblogs.com/herozhou/p/7469667.html)

## Run 开发 
```bash
    # 克隆项目
    git clone https://github.com/herozhou/vue-framework-wz.git

    # 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org


    # 本地开发 开启服务
    npm run dev


```
浏览器访问 http://localhost:8080

## wz脚手架

> 为了便于大家使用和精简体积 故开发了基于node的命令行构建工具，可安装/删除插件，比如你所开发的项目无需Tinymce插件就
```wz remove -p Tinymce ```删除Tinymce 。需要请求外部API就 执行``` wz remove -p Mockjs```，并根据提示修改相应的api地址

**请在项目初期对结构改动不大时使用cli**

```
    # 如需使用脚手架在npm install 之后执行
    npm link
   
    # 随后即可使用wz脚手架
    wz remove -p Tinymce  //卸载Tinymce插件
    wz remove -p Mockjs  //卸载Mock.js插件
    wz  -h 查看命令帮助
```
当前可卸载的插件有 Tinymce|Markdown|Mockjs|Jsontree
不久会支持卸载更多插件，便于开发精简体积




## Build 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```



## FileTree 目录结构
```shell
├── bin                       // node 命令行构建工具 
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── components             // 全局UI组件
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── utils                  // 全局公用方法
│   ├── containers              // 自适应布局组合
│   ├── view                   // view界面
│   │    ├── charts             //图表组件
│   │    ├── components         //首页组件
│   │    ├── login              //登录界面
│   │    ├── errorPages           //错误界面
│   │    └── permission        //权限测试界面
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 静态资源
│   ├── bower_components        //七牛SDK
│   ├── css                     //css
│   ├── js                      //js
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```


## About me 关于作者

```javascript
  const herozhou = {
    WeChat  : `15940512261`,
    email:`759922853@qq.com`,
    
  }
  //有任何问题请提issues或直接联系我
 //正在开发一系列帮助新手学习前端的项目，旨在和大家一起成为大前端工程师，有意请follow 我，一起加油💪
```


## Thanks 感激
感谢以下的项目,排名不分先后

* [iView](http://mouapp.com/) 
* [jquery](http://jquery.com)

## License

MIT