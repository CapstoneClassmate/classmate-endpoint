from node:8
WORKDIR /opt/service/
COPY ./src ./src
COPY ./bin ./bin
COPY ./package.json ./
RUN ["npm", "install"]
EXPOSE 4000
CMD ["npm", "run", "start"]