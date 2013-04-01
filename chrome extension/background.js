var viafID = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	viafID = request.viaf;
  	chrome.pageAction.show(sender.tab.id);
  sendResponse({viaf: request.viaf});
});