# 使用官方Python镜像，标签为3.x，这里用3.10作为示例，你可以选择适合的版本
FROM --platform=linux/amd64 python:3.10-slim

# 设置工作目录
WORKDIR /app

# 更新包索引并安装MySQL开发库
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev python3-dev pkg-config build-essential libpq-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# 将项目文件复制到容器中
COPY . /app

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 暴露容器运行时的端口
EXPOSE 5000

# 设置环境变量
ENV FLASK_APP=services.py
ENV FLASK_ENV=production
ENV FLASK_RUN_HOST=0.0.0.0


# 启动Flask应用
CMD ["gunicorn", "-b", "0.0.0.0:5000", "services:app"]
