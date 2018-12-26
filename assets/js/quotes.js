(function($) {
  const twitterShareButton = document.getElementById('twitter-share-button');

  const createTwitterButton = (text) => {
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
        const quoteText = document.getElementById('quote');
        if (request.status === 200) {
          const quoteAuthor = document.getElementById('author');
          quoteText.innerHTML = request.response[0].quote;
          quoteAuthor.innerHTML =
            request.response[0].author +
            ' (©<cite title="Source"> <a href="https://market.mashape.com/andruxnet/random-famous-quotes">Random Famous Quotes</a></cite>)';
          const twitterText =
            request.response[0].quote + ' - ' + request.response[0].author;
          createTwitterButton(twitterText);
        } else quoteText.innerHTML = 'An error occurred during your request';
      }
    };
    request.open(
      'Get',
      'https://andruxnet-random-famous-quotes.p.mashape.com/',
    );
    request.setRequestHeader('X-Mashape-Key', process.env.API_KEY);
    request.setRequestHeader('Accept', 'application/json');
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
