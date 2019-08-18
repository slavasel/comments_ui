export default {
	addTags(comments) {
		const newComments = [];
		const customTags = ['awesome', 'cool', 'something', 'yoyoyo', 'thatsCool'];
		comments.forEach((c) => {
			const show = Math.floor((Math.random() * 1) + 1);
			let randomTag = customTags[Math.floor(Math.random() * customTags.length)];
			randomTag = `[tag=${randomTag}]`;
			const newComment = { ...c };
			newComment.body = `${c.body} ${show ? randomTag : ''}`;
			newComments.push(newComment);
		});
		return newComments;
	},
};