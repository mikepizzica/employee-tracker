const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
// configuring the middleware
// allows the app to read form and json requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// create the connection object to the database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);