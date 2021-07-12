FROM node:16.4.0
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install\
        && npm install typescript -g
COPY . .
RUN tsc 
CMD ["node","./src/app.js"]
