import server from './app';

server.listen(process.env.APP_PORT);
// eslint-disable-next-line no-console
console.log(
  `\x1b[35mServer started at port: \x1b[36m${process.env.APP_PORT}\x1b[0m`
);
