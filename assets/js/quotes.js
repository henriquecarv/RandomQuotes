/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
(function($) {
	const twitterShareButton = document.getElementById("twitter-share-button");

	const createTwitterButton = text => {
		twttr.ready(() => {
			twttr.widgets.createShareButton("/", twitterShareButton, {
				size: "large",
				text,
				via: "henriquecarv",
				related: "twitterapi,twitter"
			});
		});
	};

	const cardBody = document.getElementsByClassName("card-body")[0];

	const getQuote = async () => {
		cardBody.classList.add("fade-out");

		const headers = new Headers({
			"X-Mashape-Key": process.env.API_KEY,
			Accept: "application/json"
		});
		const request = new Request(
			"https://andruxnet-random-famous-quotes.p.mashape.com/",
			{
				method: "GET",
				headers,
				mode: "cors",
				cache: "no-cache"
			}
		);

		const quoteText = document.getElementById("quote");

		try {
			const response = await fetch(request);
			const [result] = await response.json();

			const { quote, author } = result;

			const quoteAuthor = document.getElementById("author");
			quoteText.innerHTML = quote;
			quoteAuthor.innerHTML = `${author} (©<cite title="Source"> <a href="https://market.mashape.com/andruxnet/random-famous-quotes">Random Famous Quotes</a></cite>)`;

			const twitterText = `${quote} - ${author}`;
			createTwitterButton(twitterText);

			setTimeout(() => {
				cardBody.classList.add("fade-in");
				cardBody.classList.remove("fade-out");
				cardBody.classList.remove("is-paused");
			}, 500);
		} catch (error) {
			console.error(error.message);
			quoteText.innerHTML = "An error occurred during your request";
		}
	};

	const newQuote = document.getElementById("newQuote");
	newQuote.addEventListener("click", () => {
		twitterShareButton.remove();
		cardBody.classList.replace("fade-in", "fade-out");
		getQuote();
	});

	getQuote();
})(jQuery);
