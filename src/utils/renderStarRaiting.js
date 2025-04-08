function renderStarRaiting(comments) {
	if (!comments || comments.length === 0) {
		return `
        <img src="/src/icons/graystar.svg" alt="Star">
        <img src="/src/icons/graystar.svg" alt="Star">
        <img src="/src/icons/graystar.svg" alt="Star">
        <img src="/src/icons/graystar.svg" alt="Star">
        <img src="/src/icons/graystar.svg" alt="Star">
        `;
	}

	const totalRate = comments.reduce((sum, comment) => sum + comment.rate, 0);

	const averageRate = totalRate / comments.length;
	const starRate = averageRate / 2;

	console.log(averageRate, starRate);

	const stars = [];

	for (let i = 1; i <= 5; i++) {
		if (starRate >= i) {
			stars.push(`<img src="/src/icons/yellowstar.svg" alt="Star">`);
		} else if (starRate >= i - 0.5) {
			stars.push(`<img src="/src/icons/halfyellowstar.svg" alt="Star">`)
		} else {
			stars.push(`<img src="/src/icons/graystar.svg" alt="Star">`)
		}
	}


	return `${stars.join("\n     ")}`
}

export default renderStarRaiting