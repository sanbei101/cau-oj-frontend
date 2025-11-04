# CAU OJ 前端项目

CAU OJ是在线编程判题系统的前端项目。

## 项目简介

- **框架**: Vue 3.5.17
- **编程语言**: TypeScript 5.8.2
- **构建工具**: Vite 6.3.2
- **状态管理**: Pinia 3.0.3
- **路由**: Vue Router 4.5.0
- **UI 组件库**: Naive UI 2.43.1
- **代码编辑器**: CodeMirror 5.65.6
- **Markdown 渲染**: markdown-it 14.1.0
- **数学公式**: KaTeX 0.16.21
- **HTTP 客户端**: Axios 1.13.0

## 环境要求

- **Node.js**: 22.x 或更高版本
- **包管理器**: pnpm

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/sanbei101/cau-oj-frontend.git
cd cau-oj-frontend
```

### 2. 安装依赖

使用 pnpm:
```bash
pnpm install
```


## 启动项目

### 开发模式

启动开发服务器，支持热重载：

```bash
pnpm dev
```



默认会在 `http://localhost:5173` 启动开发服务器。

### 生产构建

构建生产环境代码：

```bash
pnpm build
```
## 项目结构

```
cau-oj-frontend/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口定义
│   ├── assets/         # 资源文件
│   ├── components/     # Vue 组件
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理 (Pinia)
│   ├── theme/          # 主题配置
│   ├── type/           # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   ├── views/          # 页面视图
│   ├── App.vue         # 根组件
│   ├── main.ts         # 应用入口
│   └── style.scss      # 全局样式
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── vite.config.ts      # Vite 配置
└── tsconfig.json       # TypeScript 配置
```

## 后端 API

项目默认连接到后端 API: `https://oj-back.sanbei101.tech`

如需修改后端地址，请编辑 `src/api/index.ts` 文件中的 `baseURL` 配置