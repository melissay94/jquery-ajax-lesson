document.addEventListener("DOMContentLoaded", function() {
  console.log("Ready");

  document.getElementById("submit-btn").addEventListener("click", getSubReddit);
});

const getSubReddit = function(e) {
  e.preventDefault();
  let query = document.querySelector("form")["query-field"].value;
  let options = document.querySelector("form")["search-option"].value;
  fetchSubReddit(query, options);
};

const fetchSubReddit = function(query, options) {
  let parent = document.getElementById("results");
  parent.innerHTML = " ";

  if (options === "no") {
    options = "+nsfw:no";
  } else {
    options = "";
  }
  fetch(`https://www.reddit.com/search.json?q=${query.toLowerCase()}${options}`)
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
  resultUrl.target = "_blank";

  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultUrl);
  parent.appendChild(resultDiv);
}