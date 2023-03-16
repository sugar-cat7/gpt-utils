document.addEventListener('DOMContentLoaded', () => {
  const grabTextButton = document.getElementById('grabText');

  grabTextButton.addEventListener('click', () => {
    // Send a message to the content script to get the selected text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getText' }, (response) => {
        const textArea = document.getElementById('textArea');
        textArea.value = response.text;
      });
    });
  });
});
