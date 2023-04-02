let responseElement;

document.addEventListener("DOMContentLoaded", function () {
  const btnAction = document.getElementById("btnAction");
  responseElement = document.getElementById("response");
  btnAction.addEventListener("click", async function () {
    const text = await parsePageContent();
    const { completion } = await summarizeText(text);
    responseElement.innerText = completion;
  });
});

function parsePageContent() {
  return new Promise((resolve) => {
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

          resolve(pageContent);
        }
      );
    });
  });
}

async function summarizeText(text) {
  console.log("Summarizing text:", text);
  // Send an HTTP request to the specified URL
  try {
    const response = await fetch("http://localhost:8080/text-completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
