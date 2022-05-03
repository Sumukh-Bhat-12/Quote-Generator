const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')




let apiQuotes = [];

//showing the loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hiding the loader
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//New Quote
function newQuote() {
    loading();
    //Pick a Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if author field is blank & replacing it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //Checking quote length for styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote Hide Loader
    quoteText.textContent = quote.text;
    complete();


}



//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


//Get Quotes From Api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error Here
    }
}

//onLoad
getQuotes();
