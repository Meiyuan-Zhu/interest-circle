import { DataSource } from 'typeorm';
import { User } from './entity/user';

export const AppDataSource = new DataSource( {
    type:'sqlite',
    database: 'dtabase/database.sqlite',
    synchronize: true,
    logging: false,
    entities: [User],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });