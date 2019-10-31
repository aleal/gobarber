import server from './app';

const PORT = 7777;
server.listen(PORT);
// eslint-disable-next-line no-console
console.log(`\x1b[35mServer started at port: \x1b[36m${PORT}\x1b[0m`);
