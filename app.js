document.addEventListener("DOMContentLoaded", function() {
  console.log("Ready");

  document.getElementById("submit-btn").addEventListener("click", getSubReddit);
});

const getSubReddit = function(e) {
  e.preventDefault();
  let query = document.querySelector("form")["queryField"].value;
  fetchSubReddit(query);
};

const fetchSubReddit = function(query) {
  let parent = document.getElementById("results");
  parent.innerHTML = " ";
  fetch(`https://www.reddit.com/search.json?q=${query.toLowerCase}`)
    .then(function(responseData) {
      let jsonData = responseData.json();
      return jsonData;
    })
    .then(function(jsonRedditData) {
      let result = jsonRedditData.data.children;

      let deetsINeed = result.map(function(redditResult) {
        let result = {
          title: redditResult.data.title,
          url: redditResult.data.permalink
        }
        addItem(result);
      });
    });
};

const addItem = function(result) {
  let parent = document.getElementById("results");
  let resultDiv = document.createElement("div");
  let resultTitle = document.createElement("h3");
  resultTitle.textContent = result.title;
  let resultUrl = document.createElement("a");
  resultUrl.textContent = "Link to Page";
  resultUrl.href = `https://www.reddit.com${result.url}`;

  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultUrl);
  parent.appendChild(resultDiv);
}