document.addEventListener("DOMContentLoaded", function () {
  const btnAction = document.getElementById("btnAction");
  btnAction.addEventListener("click", function () {
    parsePageContent();
  });
});

function parsePageContent() {
  // Get the current tab
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // Get the current tab's URL and ID
    var tabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        function: () => {
          const paragraphs = document.querySelectorAll("p");
          let textContent = "";

          paragraphs.forEach((paragraph) => {
            textContent += " " + paragraph.innerText;
          });

          return textContent;
        },
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error(JSON.stringify(chrome.runtime.lastError));
          return;
        }

        const pageContent = results[0].result;
        console.log("Page content:", pageContent);
      }
    );
  });
}

function getThing() {
  // Send an HTTP request to the specified URL
  return fetch("http://localhost:8080/something")
    .then(function (response) {
      // Handle the response if it was successful
      if (response.ok) {
        return response.text(); // Parse the response body as text
      }
      // Handle the error if the response was not successful
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      // Handle the parsed response data
      console.log(data);
    })
    .catch(function (error) {
      // Handle any errors that occurred during the request
      console.error("Error fetching data:", error);
    });
}
