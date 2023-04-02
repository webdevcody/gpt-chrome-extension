console.log('Content script loaded');

document.addEventListener('DOMContentLoaded', function () {
  const btnAction = document.getElementById('btnAction');
  btnAction.addEventListener('click', function () {
    const pageContent = parsePageContent();
    console.log('Page content:', pageContent);
  });
});


function parsePageContent() {
  // You can use DOM manipulation to parse the content you want.
  // For example, you can extract all the text inside paragraph tags:
  const paragraphs = document.querySelectorAll('p');
  let textContent = '';

  paragraphs.forEach((paragraph) => {
    textContent += ' ' + paragraph.innerText;
  });

  return textContent;
}

// Parse the page content and log it
