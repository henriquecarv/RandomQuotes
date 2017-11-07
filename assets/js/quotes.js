(function ($) {
    var createTwitterButton = function (text) {
        var twitterShareButton = document.getElementById('twitter-share-button');
        twttr.widgets.createShareButton(
            "/",
            twitterShareButton, {
                size: "large",
                text: text,
                via: "henriquecarv",
                related: "twitterapi,twitter"
            }
        );
    }

    var cardBody = document.getElementsByClassName('card-body')[0];

    var getQuote = function () {
        cardBody.classList.add('fade-out');
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var quoteText = document.getElementById('quote');
                    var quoteAuthor = document.getElementById('author');
                    quoteText.innerHTML = request.response.quote;
                    quoteAuthor.innerHTML = request.response.author + ' (©<cite title="Source"> <a href="https://talaikis.com/random_quotes_api/">Talaikis Quotes</a></cite>)';
                    var twitterText = request.response.quote + " - " + request.response.author;
                    createTwitterButton(twitterText);
                } else
                    quoteText.innerHTML = "An error occurred during your request";
            }
        }
        request.open('Get', 'https://talaikis.com/api/quotes/random/');
        request.responseType = 'json';
        request.send();

        setTimeout(function () {
            cardBody.classList.add('fade-in');
            cardBody.classList.remove('fade-out');
            cardBody.classList.remove('is-paused');
        }, 500);
    };

    var newQuote = document.getElementById('newQuote');
    newQuote.addEventListener('click', function (e) {
        document.getElementsByClassName('twitter-share-button')[0].remove();
        cardBody.classList.replace('fade-in', 'fade-out');
        getQuote();
    });

    getQuote();

}(jQuery));