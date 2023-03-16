import DOMPurify from 'dompurify';
import marked from 'marked';

// Helper function to get selected text
function getSelectedText() {
  let text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
}

// Helper function to convert HTML string to DOM element
function htmlStringToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = DOMPurify.sanitize(html);
  return template.content.firstChild;
}

// Helper function to convert Markdown to HTML
function markdownToHtml(md) {
  return marked(md);
}

// Listen for a message from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getText') {
    const selectedText = getSelectedText();
    const mdHtml = markdownToHtml(selectedText);
    const element = htmlStringToElement(mdHtml);
    const extractedText = element.textContent || element.innerText;
    sendResponse({ text: extractedText });
  }
});

