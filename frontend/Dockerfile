FROM node:18.17

ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

ENV PORT=3000
EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
