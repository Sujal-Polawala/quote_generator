const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  snapchatBtn = document.querySelector(".snapchat"), // Added Snapchat
  instagramBtn = document.querySelector(".instagram"), // Added Instagram
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

// Speech feature
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

// Copy feature
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

// Twitter Share
twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quoteText.innerText + " - " + authorName.innerText
  )}`;
  window.open(tweetUrl, "_blank");
});

// Snapchat Share
snapchatBtn.addEventListener("click", () => {
  let quote = `${quoteText.innerText} - ${authorName.innerText}`;
  let snapLensUrl = `https://lens.snapchat.com/b2da6f0c7fc847e38ee263a2063b86e1?share_id=2NMkwpbQ22A&locale=en-IN&metadata=${encodeURIComponent(quote)}`;

  // Open Snapchat Lens with the quote
  window.open(snapLensUrl, "_blank");
});

// Instagram Share (works on mobile only)
instagramBtn.addEventListener("click", () => {
  let quote = `${quoteText.innerText} - ${authorName.innerText}`;

  // Open Instagram Story with text
  let instagramUrl = `instagram://story?source_application=com.yourappname&text=${encodeURIComponent(quote)}`;

  // Open the Instagram app
  window.location.href = instagramUrl;
});