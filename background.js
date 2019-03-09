chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    chrome.tabs.sendMessage(tabId, {
      message: "update"
    });
  }
});
