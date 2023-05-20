import { server } from './server/Server';
import { Knex } from './server/database/knex';

const startServer = () => {
    server.listen(process.env.PORT || 3330, () => {
        console.log(`Server run in port ${process.env.PORT || 3330}`);
    });
};

if (process.env.IS_LOCALHOST !== 'true') {
    Knex.migrate.latest().then(() => {
        startServer();
    }).catch(console.log);
} else {
    startServer();
}