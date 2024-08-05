import { createConnection } from 'mysql2';

const connection = createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'ZHzh007008009',
  database: 'Interest-circle',
  authPlugins: {
    mysql_native_password: 'mysql_native_password'
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

export default connection;
