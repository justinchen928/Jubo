FROM node:18.17

ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

ENV PORT=4000
EXPOSE 4000

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
