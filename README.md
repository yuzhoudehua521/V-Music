# V-Music 仿网易云音乐

## 技术栈：vue2 + vuex + vue-router + webpack + ES6/7 + stylus + element-ui + iconfont

## 感谢Binaryify提供后端接口
[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)


## 预览地址
[v-music](https://www.wujichuanshu.com/)


##### 登录
![Image text](https://github.com/yuzhoudehua521/V-Music/blob/master/showImg/1.jpg)

##### 首页
![Image text](https://github.com/yuzhoudehua521/V-Music/blob/master/showImg/2.jpg)

##### 电台
![Image text](https://github.com/yuzhoudehua521/V-Music/blob/master/showImg/3.jpg)

##### 歌单
![Image text](https://github.com/yuzhoudehua521/V-Music/blob/master/showImg/4.jpg)

##### 播放
![Image text](https://github.com/yuzhoudehua521/V-Music/blob/master/showImg/5.jpg)



## 目录结构
##### | --dist 生成打包后的文件
##### | --node_modules 安装的依赖包
##### | --public 静态资源会被输出到目录dist
##### | --src
##### |   |--api 与后端交互使用相关方法和配置
##### |   |   |--services 对应使用的api方法和数据处理
##### |   |   |   |--instance.js 封装请求，拦截器等等 （axios，fetch）
##### |   |   |   |--home.js home相关api
##### |   |   |--config.js 配置生产，开发，测试接口配置
##### |   |   |--index.js services文件api，统一出口
##### |   |   |--resource.js 全局使用的常量
##### |   |--assets 存放静态资源，图片等等
##### |   |--model 处理歌曲视频数据等等
##### |   |--components 公用组件
##### |   |--router vue-router相关配置
##### |   |   |--index.js 导出路由配置，路由守卫配置
##### |   |   |--routes.js 所有路由
##### |   |--utils 封装的工具函数
##### |   |--views 所有的路由组件
##### |   |--app.vue 顶层路由
##### |   |--main.js 入口文件


## 安装运行
```shell
$ git clone https://github.com/yuzhoudehua521/V-Music.git
$ npm install
$ npm run serve
```

## 说明
> 具有完整的网易云音乐功能

> 如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^

> 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目，不断完善此项目
