# Installation

* __SoftWares that need to be installed initially__: Git,Nodejs(The nodejs version should later than v7.6.0).
* __Sync the code by__: Git clone https://github.com/dylanzhang123456/luckydraw.git
* __Install devDependencies__: Go to client/server folder and use the command below

```bash
$ npm install
```  

# Project structure

* __client__:Frontend folder
* __client/src/*__:Main frontend code change for lucky draw project
* __server__:Backend folder
* __server/configuration/prizeInfo.js__:prizeInfo configuration
* __server/data/winners.json__:Saved winners' info
* __server/lib/*__:Functions that serve for routes
* __server/routes/*__:Routes

# How to build up the whole project

```bash
$ cd client
$ npm run dev
```  
```bash
$ cd server
$ npm start
```  

# Learn more...
* __Vue.js__:https://cn.vuejs.org/
* __vue-cli__:https://www.npmjs.com/package/vue-cli
* __Element__:http://element-cn.eleme.io/#/en-US
* __Express__:http://www.expressjs.com.cn/
* __other__:https://segmentfault.com/a/1190000008176208