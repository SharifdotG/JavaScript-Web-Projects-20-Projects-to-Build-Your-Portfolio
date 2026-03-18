// Get DOM Elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = []; // Comment this out, if using the local quotes.js file

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]; // Uncomment this, if using the local quotes.js file

  // Check if Author field is blank and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader and Show Quote
  removeLoadingSpinner();
  quoteText.textContent = quote.text;
}

// Get Quotes from API (Comment this out, if using the local quotes.js file)
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Post Quote
function postQuote() {
  const xUrl = `https://x.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(xUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
xBtn.addEventListener("click", postQuote);

// On Load
getQuotes(); // Comment this out, if using the local quotes.js file
// newQuote(); // Uncomment this, if using the local quotes.js file
