exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("user")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("user").insert([
				{
					username: "user one",
					email: "admin@admin.com",
					password: "abc",
					street: " 123 kkkk",
					city: "van",
					province: "BC",
				},
				{
					username: "user two",
					email: "admin2@admin.com",
					password: "abc",
					phone_number: "000-0000000",
					street: "123 kkkk",
					city: "van",
					province: "BC",
				},
				{
					username: "user three",
					email: "admin3@admin.com",
					password: "abc",
					street: "123 kkkk",
					city: "van",
					province: "BC",
				},
				{
					username: "emo8355",
					email: "emo8355@github.com",
					password: "abc",
					phone_number: "000-0000000",
					street: "123 kkkk",
					city: "van",
					province: "BC",
				},
			]);
		});
};
