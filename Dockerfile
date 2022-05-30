FROM node:14.18.0

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN yarn install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 3000

## set app serving to permissive / assigned
#ENV NUXT_HOST=0.0.0.0
## set app port
#ENV NUXT_PORT=5000

# start the app
CMD [ "yarn", "start" ]
