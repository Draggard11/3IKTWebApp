FROM node:26.1.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

#docker build -t frontend_react .

#docker run -p 5173:5173 frontend_react:latest