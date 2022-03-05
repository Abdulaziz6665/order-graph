const {Pool} = require('pg')

const host = {
  host: 'localhost',
  database: 'order_time',
  user: 'postgres',
  password: '1',
  port: 5432
}
const devConfig = `postgresql://${host.user}:${host.password}@${host.host}:${host.port}/${host.database}`
// elephant db
const proConfig = 'postgres://pdbrmxqq:RJbBJi-DC-IgC7KpYyT32NLySRintiLk@jelani.db.elephantsql.com/pdbrmxqq'

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig
})


const fetch = async (SQL, ...params) => {
	const client = await pool.connect()
	try {
		const { rows: [row] } = await client.query(SQL, params.length ? params : null)
		return row
	}
	finally {
		client.release()
	}
}

const fetchAll = async (SQL, ...params) => {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(SQL, params.length ? params : null)
		return rows
	}
	finally {
		client.release()
	}
}

module.exports = {
	fetch, fetchAll
}