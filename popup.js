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
