document.getElementById("extract-text-button").addEventListener("click",(()=>{chrome.tabs.query({active:!0,currentWindow:!0},(t=>{chrome.tabs.sendMessage(t[0].id,{message:"extract_text"},(t=>{const e=t.text;navigator.clipboard.writeText(e).then((()=>{alert("Text content has been copied to the clipboard.")}),(t=>{console.error("Error copying text content to clipboard:",t)}))}))}))}));