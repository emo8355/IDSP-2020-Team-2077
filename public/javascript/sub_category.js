const categories = document.querySelectorAll(".go_btn");

function capitalize(str) {
	this.input = str;
}
capitalize.prototype = {
	split_by_dash: function (input) {
		const str = input.split("/");
		return this.get_first_cap(str[0]) + " / " + this.get_first_cap(str[1]);
	},
	split_by_underline: function (input) {
		const str = input.split("_");
		return this.get_first_cap(str[0]) + " " + this.get_first_cap(str[1]);
	},
	get_first_cap: function (input) {
		return input.charAt(0).toUpperCase() + input.slice(1);
	},
	check_includes: function () {
		return this.input.includes("/") && this.input.includes("_")
			? this.split_by_dash(this.split_by_underline(this.input))
			: this.input.includes("_")
			? this.split_by_underline(this.input)
			: this.input.includes("/")
			? this.split_by_dash(this.input)
			: this.get_first_cap(this.input);
	},
};

function set_attributes(ele, obj) {
	for (let key in obj) {
		ele.setAttribute(key, obj[key]);
	}
}

function get_sub_link(categories, url, main_category) {
	$.ajax({
		type: "get",
		url: url,
		success: function (response) {
			categories.forEach((category, index) => {
				const name = new capitalize(response[index].name);
				category.innerHTML = name.check_includes();
				const attr = {
					endpoint: `/content/sub_category/${response[index].name.replace(
						"/",
						"_"
					)}/${main_category}/${index + 1}`,
					class: "requirement_frm",
				};
				set_attributes(category, attr);
			});
		},
		error: function (err) {
			alert(
				`Opps something went wrong in the server side, please try again later, err: ${err.message}`
			);
		},
	});
}

$(window).on("load", (e) => {
	e.preventDefault();
	categories.forEach((category, index) => {
		const name = new capitalize(category.innerHTML);
		category.innerHTML = name.check_includes();
	});
});

categories.forEach((category, index) => {
	$(category).on("click", (e) => {
		e.preventDefault();
		const main_category = index + 1;
		let url = category.getAttribute("endpoint");
		if (!$(category).hasClass("requirement_frm")) {
			get_sub_link(categories, url, main_category);
		} else {
			// $(".content_box").hide();
			$("#getreq").attr("action", url).submit();
		}
	});
});
