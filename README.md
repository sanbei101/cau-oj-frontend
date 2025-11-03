# CAU OJ 前端项目

CAU OJ (China Agricultural University Online Judge) 是一个在线编程判题系统的前端项目。

## 项目简介

本项目是基于 Vue 3 + TypeScript + Vite 构建的现代化前端应用，为用户提供在线编程练习和代码提交的界面。

## 技术栈

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

- **Node.js**: 推荐 v18.x 或更高版本
- **包管理器**: pnpm (推荐) 或 npm

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/sanbei101/cau-oj-frontend.git
cd cau-oj-frontend
```

### 2. 安装依赖

使用 pnpm (推荐):
```bash
pnpm install
```

或使用 npm:
```bash
npm install
```

## 启动项目

### 开发模式

启动开发服务器，支持热重载：

```bash
pnpm dev
```

或

```bash
npm run dev
```

默认会在 `http://localhost:5173` 启动开发服务器。

### 生产构建

构建生产环境代码：

```bash
pnpm build
```

或

```bash
npm run build
```

构建完成后，产物会输出到 `dist` 目录。

### 预览生产构建

预览生产构建的结果：

```bash
pnpm preview
```

或

```bash
npm run preview
```

## 可用脚本

项目中提供了以下 npm 脚本：

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm preview` - 预览生产构建
- `pnpm type-check` - 运行 TypeScript 类型检查
- `pnpm watch` - 监听模式下的 TypeScript 类型检查
- `pnpm format` - 使用 Prettier 格式化代码

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

如需修改后端地址，请编辑 `src/api/index.ts` 文件中的 `baseURL` 配置。

## 代码规范

项目使用 Prettier 进行代码格式化。在提交代码前，建议运行：

```bash
pnpm format
```

## 常见问题

### 1. pnpm 未安装

如果系统中没有安装 pnpm，可以通过以下命令安装：

```bash
npm install -g pnpm
```

### 2. 端口被占用

如果默认端口 5173 被占用，Vite 会自动尝试下一个可用端口。你也可以在启动时指定端口：

```bash
pnpm dev --port 3000
```

### 3. 依赖安装失败

如果依赖安装失败，可以尝试：

1. 清除缓存：
   ```bash
   pnpm store prune  # 使用 pnpm
   # 或
   npm cache clean --force  # 使用 npm
   ```

2. 删除 `node_modules` 和锁文件后重新安装：
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目为私有项目。
