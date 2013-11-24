
//var viafuri = 'http://viaf.org/viaf/71388025';
var viafuri = chrome.extension.getBackgroundPage().viafID;
var contempAuthors = {
  /**
   * @type {string}
   * @private
   */
  searchOnBNB_: 'http://bnb.data.bl.uk/sparql?query=PREFIX+rdf%3A++%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+owl%3A++%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0D%0APREFIX+bio%3A++%3Chttp%3A%2F%2Fpurl.org%2Fvocab%2Fbio%2F0.1%2F%3E%0D%0APREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0ASELECT+DISTINCT+%3Fpersonb+%3Fname+%3Fdob%0D%0AWHERE+%7B%0D%0A%3Fpersona+owl%3AsameAs+%3C' +
        encodeURIComponent(viafuri) +
        '%3E+.%0D%0A%3Fpersona+bio%3Aevent+%3Feventa+.%0D%0A%3Feventa+rdf%3Atype+bio%3ABirth+.%0D%0A%3Feventa+bio%3Adate+%3Fdob+.%0D%0A%3Feventb+bio%3Adate+%3Fdob+.+%0D%0A%3Feventb+rdf%3Atype+bio%3ABirth+.%0D%0A%3Fpersonb+bio%3Aevent+%3Feventb+.%0D%0A%3Fpersonb+foaf%3Aname+%3Fname%0D%0A%7D',

  requestContemporaries: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnBNB_, true);
    req.onload = this.showContemporaries_.bind(this);
    req.send(null);
  },

  showContemporaries_: function (e) {
    var list = document.createElement('ul');
    document.body.appendChild(list);
    var authors = e.target.responseXML.getElementsByTagName("result");
    for (var i = 0; i < authors.length; i++) {
      var bindings = authors[i].getElementsByTagName("binding");
      for (var j= 0; j < bindings.length; j++) { 
        if (bindings[j].getAttribute("name")==="personb") {
          var u = this.bindingUri_(bindings[j]);
        }
        if (bindings[j].getAttribute("name")==="name") {
          var t = this.bindingLiteral_(bindings[j]);
        }
      }
      console.log(t);
      console.log(u);
      var a = document.createElement('a');
      a.appendChild(document.createTextNode(t));
      a.title = t;
      a.href = u;
      a.target = '_blank';
      var auth = document.createElement('li');
      auth.appendChild(a);
      document.getElementsByTagName("ul")[0].appendChild(auth);
    }
  },

  bindingLiteral_: function (result) {
    return result.getElementsByTagName("literal")[0].childNodes[0].nodeValue;
  },

  bindingUri_: function (result) {
    return result.getElementsByTagName("uri")[0].childNodes[0].nodeValue;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  contempAuthors.requestContemporaries();
});