FROM node:16.4.0
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["node","./src/app.js"]