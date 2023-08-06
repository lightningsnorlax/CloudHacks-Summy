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

const hostname = "http://localhost:5000/";

function getSummary() {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      var url = tabs[0].url;
      console.log(tabs);
      document.getElementById("url").textContent = url;
      fetch(`${hostname}/getSummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set appropriate content type
        },
        body: JSON.stringify({
          url: url,
        }), // Convert data to JSON string
      })
        .then((data) => {
          console.log(data.json());
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  );
}

getSummary();
