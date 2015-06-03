
// Global accessor that the popup uses.
var searches = {};
var selectedSearch = null;
var selectedId = null;

function updateSearch(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(search) {
    searches[tabId] = search;
    if (!search) {
      chrome.pageAction.hide(tabId);
    } else {
      chrome.pageAction.show(tabId);
      if (selectedId == tabId) {
        updateSelected(tabId);
      }
    }
  });
}

function updateSelected(tabId) {
  selectedSearch = searches[tabId];
  if (selectedSearch)
    chrome.pageAction.setTitle({
        tabId:tabId, 
        title:selectedSearch.keyword + "(" + selectedSearch.replace_cnt + ")"
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateSearch(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateSearch(tabs[0].id);
});
