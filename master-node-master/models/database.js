const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:8080/hotspot';

const client = new pg.Client(connectionString);
client.connect();

// create the table of blocks
client.query('CREATE TABLE blocks(blockID SERIAL NOT NULL, city VARCHAR(100) NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL)', (err, res) => {
	if (err) {
		console.log("There was an error creating the blocks table: " + err);
	}
	else {
		console.log(res.rows[0])
	}
});

