function convertToLaTeX(selection) {
  const range = selection.getRangeAt(0);
  const container = document.createElement("div");
  range.cloneContents().childNodes.forEach((child) => {
    container.appendChild(child.cloneNode(true));
  });

  container.querySelectorAll(".MathJax, .katex-math").forEach((element) => {
    const mathjax = element.getAttribute("data-math");
    if (mathjax) {
      element.textContent = mathjax;
    } else {
      const katex = element.querySelector(
        'annotation[encoding="application/x-tex"]'
      );
      if (katex) {
        element.textContent = katex.textContent;
      }
    }
  });

  return container.innerText;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "copyLaTeX") {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const latex = convertToLaTeX(selection);
      await navigator.clipboard.writeText(latex);
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false });
    }
  }
});
