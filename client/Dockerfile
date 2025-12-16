# 1. Dùng Node.js
FROM node:22-alpine

# 2. Vào thư mục làm việc
WORKDIR /app

# 3. Copy file package.json (Frontend) và cài thư viện
COPY package*.json ./
RUN npm install

# 4. Copy code Frontend vào
COPY . .

# 5. Mở cổng 5173 (Cổng mặc định của Vite)
EXPOSE 5173

# 6. Chạy Vite với cờ --host để truy cập được từ bên ngoài container
CMD ["npm", "run", "dev", "--", "--host"]