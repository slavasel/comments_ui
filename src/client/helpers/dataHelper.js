export default {
	// get all available tags from the comments within formats:
	// [tag=<tagname>] and #<tagname>]
	findTags(comments) {
		const tags = [];
		comments.forEach((c) => {
			const regex = /\[tag=([a-zA-Z0-9]+)\]/gi;
			let result;
			while ( (result = regex.exec(c.body)) ) {
				if (result && result[1]) {
					tags.push(result[1]);
				}
			}
			let hashResult;
			const hashRegex = /#([a-zA-Z0-9]+)/gi;
			while ( (hashResult = hashRegex.exec(c.body)) ) {
				if (hashResult && hashResult[1]) {
					tags.push(hashResult[1]);
				}
			}
		});
		return tags;
	},

	// parse comments to restore initial state of tags and users
	parseComments(comments) {
		const newComments = [];
		comments.forEach((c) => {
			const tagRegex = /\[tag=([a-zA-Z ]+)\]/gi;
			const userRegex = /\[to=([a-zA-Z ]+)\]/gi;
			const newComment = { ...c };
			newComment.body = newComment.body.replace(tagRegex, '<b>#$1</b>');
			newComment.body = newComment.body.replace(userRegex, '<i><b>$1</b></i>')
			newComments.push(newComment);
		});
		return newComments;
	},

	filterByTags(comments, tags) {
		const newComments = [];
		comments.forEach((c) => {
			let matched = 0;
			tags.forEach((tag) => {
				if (c.body.indexOf(`#${tag}`) !== -1) {
					matched++;
				}
			});

			if (matched === tags.length) {
				newComments.push(c);
			}
		});
		return newComments;
	},

	// get all users from comments
	findUsers(comments) {
		const users = [];
		comments.forEach((c) => {
			users.push(c.name);
		});
		return users;
	},

	compare(a, b) {
		if (a.value < b.value){
			return 1;
		}
		if (a.value > b.value){
			return -1;
		}
		return 0;
	},

	getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	},

	prepareTagsChart(tags) {
		const tagsByValue = {};
		tags.forEach((tag) => {
			tagsByValue[tag] = tagsByValue[tag] ? ++tagsByValue[tag] : 1;
		});

		const elements = [];
		Object.keys(tagsByValue).forEach((key) => {
			elements.push({
				value: tagsByValue[key],
				title: `${key}: ${tagsByValue[key]}`,
				color: this.getRandomColor(),
			});
		});

		const sortedElements = elements.sort(this.compare);
		return sortedElements.slice(0, 3);
	},
};