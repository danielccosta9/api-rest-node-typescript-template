import { server } from './server/Server';

server.listen(process.env.PORT || 3330, () => {
    console.log(`Server run in port ${process.env.PORT || 3330}`);
});