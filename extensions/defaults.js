var config = {
  entityMap: {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  },
};

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = tabs[0].url;
  console.log(tabs);
  document.getElementById("url").textContent = url;
  // chrome.tabs.sendMessage(tabs[0].windowId, {
  //   type: "NEW",
  //   url: url,
  // });
});
