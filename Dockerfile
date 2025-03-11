# Используем образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь код
COPY . .

# Собираем проект
RUN npm run build

# Открываем порт
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
