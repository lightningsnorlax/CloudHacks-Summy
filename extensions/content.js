(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    let { type, url } = obj;
    printFun();
  });

  const printFun = () => {
    console.log(document.body);
  };
})();
