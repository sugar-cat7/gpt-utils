chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyLaTeX",
    title: "Copy Math Formula",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyLaTeX") {
    chrome.tabs.sendMessage(tab.id, { action: "copyLaTeX" }, (response) => {
      if (chrome.runtime.lastError) {
        console.log("Waiting for the content script to be ready...");
        setTimeout(() => {
          chrome.tabs.sendMessage(tab.id, { action: "copyLaTeX" });
        }, 1000);
      }
    });
  }
});
