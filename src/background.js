loadOptions().then(function() {

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    
    // if (tab.url !== undefined && changeInfo.status === 'complete' && savedOptions.matching_urls.indexOf(cleanUrl(tab.url, false)) > -1) {

    if (tab.url !== undefined && changeInfo.status === 'complete' && hasUrlMatch(tab.url)) {

      chrome.tabs.sendMessage(tab.id, {message: "marco"}, function(response) {
        if (!response) {
          chrome.tabs.executeScript(tabId, {
            file: 'content.js'
          });
        }
      });
    }
  });
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    loadOptions();
  });
});