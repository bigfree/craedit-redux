FROM node:18-alpine

# set working directory
WORKDIR /redux

# add `/services/node_modules/.bin` to $PATH
ENV PATH /redux/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

# install app dependencies
RUN yarn global add react-scripts
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]