// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   console.log(tabId, tab.url);
//   chrome.tabs.sendMessage(tabId, {
//     type: "NEW",
//     url: tab.url,
//   });
// });

// // function getCurrentTab() {
// //   return new Promise(function (fulfill, reject) {
// //     chrome.tabs.getCurrent(function (tab) {
// //       if (tab) fulfill(tab);
// //       else
// //         reject(
// //           chrome.runtime.lastError || new Error("Could not get current tab")
// //         );
// //     });
// //   });
// // }

// // getCurrentTab();
