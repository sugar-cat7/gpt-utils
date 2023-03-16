document.getElementById('extract-text-button').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'extract_text' }, (response) => {
        const text = response.text;
        // ここでテキストを利用して何かをする（例：クリップボードにコピー）
        navigator.clipboard.writeText(text).then(() => {
          alert('Text content has been copied to the clipboard.');
        }, (error) => {
          console.error('Error copying text content to clipboard:', error);
        });
      });
    });
  });
