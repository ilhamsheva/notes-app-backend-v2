import servers from './servers/index.js';
 
const host = process.env.HOST;
const port = process.env.PORT;

servers.listen(port, () => {
 console.log(`Server running at http://${host}:${port}`);
});