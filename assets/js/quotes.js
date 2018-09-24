(function($) {
	const twitterShareButton = document.getElementById('twitter-share-button');

	const createTwitterButton = text => {
		twttr.ready(() => {
			twttr.widgets.createShareButton('/', twitterShareButton, {
				size: 'large',
				text: text,
				via: 'henriquecarv',
				related: 'twitterapi,twitter',
			});
		});
	};

	const cardBody = document.getElementsByClassName('card-body')[0];

	const getQuote = () => {
		cardBody.classList.add('fade-out');
		const request = new XMLHttpRequest();
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200) {
					const quoteText = document.getElementById('quote');
					const quoteAuthor = document.getElementById('author');
					quoteText.innerHTML = request.response.quote;
					quoteAuthor.innerHTML =
						request.response.author +
						' (©<cite title="Source"> <a href="https://talaikis.com/random_quotes_api/">Talaikis Quotes</a></cite>)';
					const twitterText =
						request.response.quote + ' - ' + request.response.author;
					createTwitterButton(twitterText);
				} else quoteText.innerHTML = 'An error occurred during your request';
			}
		};
		request.open('Get', 'https://talaikis.com/api/quotes/random/');
		request.responseType = 'json';
		request.send();

		setTimeout(() => {
			cardBody.classList.add('fade-in');
			cardBody.classList.remove('fade-out');
			cardBody.classList.remove('is-paused');
		}, 500);
	};

	const newQuote = document.getElementById('newQuote');
	newQuote.addEventListener('click', () => {
		twitterShareButton.remove();
		cardBody.classList.replace('fade-in', 'fade-out');
		getQuote();
	});

	getQuote();
})(jQuery);
