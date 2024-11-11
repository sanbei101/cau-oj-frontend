FROM node:22-alpine as builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install

RUN pnpm build

# 部署阶段
FROM nginx:mainline-alpine3.20-slim
# 复制构建好的前端静态文件到 nginx 默认的静态目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义的 nginx 配置文件（可选）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 3001

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
