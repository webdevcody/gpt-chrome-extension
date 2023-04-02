console.log("Content script loaded");

document.addEventListener("DOMContentLoaded", function () {
  const btnAction = document.getElementById("btnAction");
  btnAction.addEventListener("click", function () {
    const pageContent = parsePageContent();
    console.log("Page content:", pageContent);
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
          return document.querySelectorAll("p");
        },
      },
      (results) => {
        console.log("results", results);
        var paragraphs = results;

        let textContent = "";

        paragraphs.forEach((paragraph) => {
          textContent += " " + paragraph.innerText;
        });

        return textContent;
      }
    );
  });
}
