# ace_edu_wechat

> A Vue.js project

## 如何开发启动，生产环境部署

#### 开发环境

* 先开发模式启动 Express 转发层

* 再启动前端开发模式

#### 生产环境

* 先 build 前端代码到 server/public 中

* 再生产模式启动 Express 转发层

## 前端页面 Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Express 转发层

```bash
cd server

# install dependencies
npm install

# start for development
node ./bin/www

# start for production
node ./bin/www -prod

# or
pm2 start ./bin/www -- --prod
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
