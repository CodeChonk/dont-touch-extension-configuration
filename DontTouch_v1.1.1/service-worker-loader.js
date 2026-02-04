const blockUrl = chrome.runtime.getURL("/assets/blocked.html");

//listener waits for tab to be updated to execute
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const thisUrl = new URL(tab.url); // url object for protocol determination

  if (thisUrl) { //ensures present tab
    if (thisUrl.protocol == "chrome-extension:") {  //confines function to blocking extension pages
       if (!isUrlAllowed(thisUrl)) { // if url not allowed redirect current tab to block page
        chrome.tabs.update(tabId, { url: blockUrl });
       }   
     }
  }
});

//function searches url for disallowed patterns
function isUrlAllowed(url) {
    if (
        url.href.includes("setting") || 
        url.href.includes("config") || 
        url.href.includes("option") ||
        url.href.includes("dashboard")
      ) {
          
          return false;}
    
    else {
      return true;
    }
}
