# 1. Dùng Node.js bản nhẹ
FROM node:22-alpine

# 2. Tạo thư mục làm việc trong container
WORKDIR /app

# 3. Copy file package.json (Backend) và cài thư viện
COPY package*.json ./
RUN npm install

# 4. Copy toàn bộ code Backend vào
COPY . .

# 5. Mở cổng 5000
EXPOSE 5000

# 6. Chạy server
CMD ["node", "server.js"]