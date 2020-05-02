const mysql = require("mysql");

const connection = mysql.createConnection({
	user: process.env.admin,
	password: process.env.password,
	database: `craigslist`,
	host: process.env.DSN || "35.203.176.28",
	ssl: {
		ca: process.env.ca.replace(/\\n/g, "\n"),
		cert: process.env.cert.replace(/\\n/g, "\n"),
		key: process.env.key.replace(/\\n/g, "\n"),
	},
});

connection.connect(function (err, connection) {
	if (err) {
		console.log(err.message);
		return;
	} else {
		console.log(`Database connected`);
	}
});

exports.get_all_user = (cb) => {
	connection.query(`SELECT * FROM user`, cb);
};

exports.get_user_by_email = (email, cb) => {
	connection.query(`SELECT * FROM user WHERE email = ?`, [email], cb);
};

exports.is_user = (email, cb) => {
	// const stm = { user: email };
	connection.query(
		"SELECT CASE WHEN EXISTS ( SELECT email FROM user WHERE email = ?) then TRUE else FALSE end as bool",
		[email],
		cb
	);
};

exports.create_user = (info, cb) => {
	connection.query(`INSERT INTO user SET ?`, info, cb);
};

exports.get_user_by_id = (id, cb) => {
	connection.query(`SELECT * FROM user WHERE id = ?`, [id], cb);
};

exports.get_category = (cb) => {
	connection.query(`SELECT type FROM category`, cb);
};

exports.get_category_id = (type, cb) => {
	connection.query(`SELECT id FROM category WHERE type = ?`, [type], cb);
};

exports.get_subcategory = (category_id, cb) => {
	connection.query(
		`SELECT name FROM sub_category WHERE category_id = ?`,
		[category_id],
		cb
	);
};

exports.get_all_post_by_category = (category, sub_category_id, cb) => {
	connection.query(
		"SELECT * FROM view_post_img_detail WHERE main_category = ? AND sub_category = ?",
		[category, sub_category_id],
		cb
	);
};

exports.get_user_id_by_email = (email, cb) => {
	connection.query(`SELECT id FROM user WHERE email = ?`, [email], cb);
};

// connection.query(`select * from user`, (err, rows) => {
// 	console.log(rows);
// });

exports.create_post = (info, cb) => {
	connection.query(`INSERT INTO post SET ?`, info, cb);
};

exports.upload_photo = (photo, cb) => {
	connection.query(`INSERT INTO image SET ?`, photo, cb);
};
