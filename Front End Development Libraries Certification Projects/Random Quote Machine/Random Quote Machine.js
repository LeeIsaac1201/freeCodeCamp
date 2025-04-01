// Specifies that the code is intended to run in a browser environment for ESLint.
/* eslint-env browser */

let quotesData = [];

// Fetch quotes from the GitHub Gist JavaScript Object Notation (JSON) file.
async function fetchQuotes() {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // eslint-disable-next-line no-console
    console.log('API Response:', data);
    quotesData = data.quotes;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching quotes:', error);
    document.getElementById('text').textContent =
      'Oops! Could not load quotes.';
    document.getElementById('author').textContent = 'Unknown';
  }
}

// Get a random quote from the quotes dataset.
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  return quotesData[randomIndex];
}

// Updates the page with a new quote, author, and tweet link.
function updateQuote() {
  try {
    const randomQuote = getRandomQuote();
    if (!randomQuote) {
      throw new Error('No quotes available.');
    }
    const quoteText = randomQuote.quote;
    const quoteAuthor = randomQuote.author;

    // Update the quote text.
    document.getElementById('text').textContent = quoteText;
    // Update the author text.
    document.getElementById('author').textContent = quoteAuthor;

    // Build the Tweet uniform resource locator (URL).
    const tweetUrl =
      'https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&related=freecodecamp&text=' +
      encodeURIComponent('"' + quoteText + '" ' + quoteAuthor);

    // Update the Tweet-quote element's href attribute.
    document.getElementById('tweet-quote').setAttribute('href', tweetUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating quote:', error);
    document.getElementById('text').textContent =
      'Oops! Could not fetch a new quote.';
    document.getElementById('author').textContent = 'Unknown';

    // Set a default Tweet link.
    const tweetUrl =
      'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent('Oops! Could not fetch a new quote.');
    document.getElementById('tweet-quote').setAttribute('href', tweetUrl);
  }
}

// Attach event listener to the new quote button.
document.getElementById('new-quote').addEventListener('click', updateQuote);

// On first load, fetch quotes and display a random quote.
fetchQuotes()
  .then(() => {
    updateQuote();
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error during initialization:', error);
    document.getElementById('text').textContent =
      'Oops! Could not initialize the app.';
    document.getElementById('author').textContent = 'Unknown';
  });
