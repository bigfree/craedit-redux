FROM node:16-alpine

# set working directory
WORKDIR /redux

# add `/services/node_modules/.bin` to $PATH
ENV PATH /redux/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

# install app dependencies
RUN yarn global add react-scripts@3.4.1
RUN npx browserslist@latest --update-db
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]