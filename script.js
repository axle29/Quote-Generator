const quoteIntext = document.querySelector(".quote")
const authorIntext = document.querySelector(".author")
const tagsIntext = document.querySelector(".tags")
const quoteBtn = document.querySelector(".generate")
const shareBnt = document.querySelector(".share")
let max = 20;

quoteBtn.addEventListener("click", function() {
    fetch(
  "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
)
  .then((response) => response.json())
  .then((data) => {
    const originalContent = quoteBtn.innerHTML;
    quoteBtn.innerHTML = '<div id="talk">Loading...</div>';
    if (quoteBtn.matches(":hover")) {
        const talkDiv = document.getElementById("talk");
        talkDiv.classList.add("talkjr");
    }
    quoteBtn.addEventListener("mouseenter", () => {
        const talkDiv = document.getElementById("talk");
        if (talkDiv) talkDiv.classList.add("talkjr");
    });

    quoteBtn.addEventListener("mouseleave", () => {
        const talkDiv = document.getElementById("talk");
        if (talkDiv) talkDiv.classList.remove("talkjr");
    });
    setTimeout(() => {quoteBtn.innerHTML = originalContent;}, 200)  
    document.getElementById("tags").innerHTML = "";
    // Use the data here
    let randomNum = Math.floor(Math.random() * max)
    let arr = data[randomNum].tags
    const quote = data[randomNum].quote;
    quoteIntext.textContent= '"' + quote + '"';
    authorIntext.textContent = data[randomNum].author;
    for(let i=0 ;i<arr.length; i++ ){
        const message = arr[i];

        const newDiv = document.createElement("div");  // create div
        newDiv.textContent = message;                  // put variable text inside

        document.getElementById("tags").appendChild(newDiv);             // add to page


    }
  })
  .catch((error) => {
    // Handle the error here
  });
    
    
})

shareBnt.addEventListener("click" ,function(){
    
    navigator.clipboard.writeText(quoteIntext.textContent + " " + authorIntext.textContent)
    .then(() => {
      const originalContent = shareBnt.innerHTML;
      shareBnt.innerHTML = '<div id="talk2">Copied!</div>';
      if (quoteBtn.matches(":hover")) {
        const talkDiv = document.getElementById("talk2");
        talkDiv.classList.add("talkjr2");
       }
      shareBnt.addEventListener("mouseenter", () => {
        const talkDiv = document.getElementById("talk2");
        if (talkDiv) talkDiv.classList.add("talkjr2");
      });

      shareBnt.addEventListener("mouseleave", () => {
        const talkDiv = document.getElementById("talk2");
        if (talkDiv) talkDiv.classList.remove("talkjr2");
      });
      setTimeout(() => {shareBnt.innerHTML = originalContent;}, 200)
      
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
    
})