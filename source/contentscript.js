var regex = /http:\/\/viaf\.org\/viaf\/\d+/;
// Test the text of the body element against our regular expression.
var anchors = document.body.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++) {
  console.log(anchors[i].getAttribute("href"));
  console.log(regex.test(anchors[i].getAttribute("href")));
	if (regex.test(anchors[i].getAttribute("href"))) {
		// maybe add each found link to array, then return array?
  		// The regular expression produced a match, so notify the background page.
  		chrome.runtime.sendMessage({viaf: anchors[i].getAttribute("href")}, function(response) {
  			console.log(response.viaf);
  		});
  		break;
	} else {
  		continue;
	}
}
