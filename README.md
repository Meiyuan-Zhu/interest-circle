# Interest Cirlce Project

## 产物介绍及使用方式

用vscode打开interest-circle文件夹，将database的数据导入mongodb中。

在终端运行：

```shell
cd frontend
npm install
npm run build
npm start
```

再新建一个终端，运行：

```shell
cd backend
npm install
npm run build
npm start
```

打开前端的链接，进入web的home主页

![截屏2024-08-11 19.49.57](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 19.49.57.png)

点击Sign up按钮，进入register界面。输入username和password即可**注册**。

![截屏2024-08-11 19.50.29](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 19.50.29.png)

如果不是第一次使用，直接点击log in**登录**即可

（ 现有的一个账号: username: test2; password: password123 ）

![截屏2024-08-11 19.51.34](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 19.51.34.png)

登录后进入interest-circles界面如下

![截屏2024-08-11 19.51.48](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 19.51.48.png)

点击页面上方`log out`按钮可以退出登录，返回home页。

点击`Create Your Circle`按钮弹出一个界面可以**创建一个新的兴趣圈**，创建后的兴趣圈会显示在界面下半部分（点击下方的👈 👉按钮翻页查看）。![截屏2024-08-11 19.55.46](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 19.55.46.png)

**Search**可以在所有兴趣圈中搜索名字中包含输入关键字的兴趣圈。清空Search框内容再点击Search就会重新显示所有兴趣圈。

![截屏2024-08-11 19.59.02](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 19.59.02.png)

点击任何一个兴趣圈即可进入兴趣圈内部。

![截屏2024-08-11 20.01.43](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 20.01.43.png)

兴趣圈内部`Member Activity Statistics`模块**显示兴趣圈成员活跃情况**（主要展示发帖和评论数量）。

![截屏2024-08-11 20.03.38](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 20.03.38.png)

`Notifications`模块为**其他用户评论所创建帖子的提示通知**。![截屏2024-08-11 20.03.26](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 20.03.26.png)

`Posts`模块

![截屏2024-08-11 20.04.50](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 20.04.50.png)

`Add a Post` 按钮弹出界面允许用户在**兴趣圈内发帖**，选择文件可以**给帖子添加图片**（也可以选择不添加图片直接submit）。

![截屏2024-08-11 20.06.28](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 20.06.28.png)

下方是帖子列表，显示在这个兴趣圈内的所有帖子，所有**用户都可以查看**。用户可以在Write a comment input框内输入评论，回车键发**评论**，评论会显示在帖子文字内容的下方，也可以看到其他用户的评论。

![截屏2024-08-11 20.07.30](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 20.07.30.png)

## 额外功能说明

### 1. 注册、登出功能

除了基本的多用户的登录功能，我还额外设计了用户注册和登出功能。用户注册的username具有唯一性，如果别人已经注册过该username就不可以再注册这个username了。

### 2. 兴趣圈搜索功能

用户可以通过关键词在web现有的所有兴趣圈中搜索自己想要找的兴趣圈。

### 3. 分页功能

在兴趣圈的主界面做了分页功能，用户可以翻看不同页的兴趣圈，避免在一页web下列出所有兴趣圈的冗杂性，提升界面美观度。

### 4. 评论提示

增加Notifications模块，用户发的帖子被评论了会有消息提示在这个模块。这个模块每60s会自动刷新一次，不需要用户手动刷新。

### 5. 数据库

本项目部署链接了本地的Mongodb数据库，用户的账号、密码，兴趣圈信息，帖子信息都存在数据库不同的collection当中。

![截屏2024-08-11 23.08.29](/Users/zhumeiyuan/Library/Application Support/typora-user-images/截屏2024-08-11 23.08.29.png)

## 技术栈

### Frontend

**React.js**: 构建用户界面，处理页面渲染、组建状态管理等。

**Axios**: 在前端发送HTTP请求，与后端API进行数据交互。

### Backend

**Node.js**: 服务器端的运行环境，处理后端逻辑。

**TypeScript**: 为项目提供静态类型检查，提升代码质量

**MidwayJS**: 组织后端代码结构，管理路由、控制器、服务等。

**Mongoose**: 与MongoDB数据库交互，定义和管理数据模型。

**JWT (JSON Web Token)**: 用户身份验证和数据安全传输。

### Deployment

**PM2**: 管理Node.js应用的进程，确保服务的稳定运行。

**GitHub Actions**：持续集成与持续部署（CI/CD），自动化测试、构建和部署流程。





