const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";

  fetch("https://dummyjson.com/quotes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      quoteText.innerText = result.quote;
      authorName.innerText = result.author;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    })
    .catch((error) => {
      console.error("Failed to fetch the quote:", error);
      quoteText.innerText = "Could not fetch a quote. Please try again later.";
      authorName.innerText = "";
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "Try Again";
    });
}

// Event listeners
quoteBtn.addEventListener("click", randomQuote);

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    quoteText.innerText
  )}`;
  window.open(tweetUrl, "_blank");
});
