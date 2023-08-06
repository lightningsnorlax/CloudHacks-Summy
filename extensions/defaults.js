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

var url;

async function getSummary() {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      url = tabs[0].url;
      console.log(tabs);
      // document.getElementById("url").textContent = url;
      await fetch(`${hostname}/getSummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["message"] == "OK") {
            document.getElementById("summaryDiv").innerHTML = `${data["summary"]}`;
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  );
}

async function askQuestion(question) {
  generatingText = true;
  console.log("ask Question");
  document.getElementById("chatBody").innerHTML += `
    <div class="flex items-center gap-2 loading">
      <img src="./img/Summy.png" class="aspect-square w-8 self-end" />
      <div
        class="w-fit max-w-[75%] bg-gray-300 rounded-[1rem] flex items-center py-2 px-4 min-h-[18px] chatAnswer"
      >
        <span class="circle bouncing"></span>
        <span class="circle bouncing"></span>
        <span class="circle bouncing"></span>
      </div>
    </div>`;
  await fetch(`${hostname}/askQn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: question,
      url: url,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data["message"] == "OK") {
        let answer = data["answer"];
        let chatAnswerArr = document.getElementsByClassName("chatAnswer");
        chatAnswerArr[chatAnswerArr.length - 1].innerHTML = `${answer}`;
        scrollBottom();
        generatingText = false;
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}

async function onLoad() {
  await getSummary();
  await scrollBottom();
}

async function scrollBottom() {
  console.log("hi");
  document.getElementById("chatBody").scrollTop =
    document.getElementById("chatBody").scrollHeight;
}

var generatingText = false;

function sendMessage() {
  let chatContent = document.getElementById("chat").value;
  if (!generatingText) {
    document.getElementById("chatBody").innerHTML += `
      <div class="flex items-center gap-2 flex-row-reverse">
        <img
          src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
          class="aspect-square w-8 self-end"
        />
        <div
          class="w-fit max-w-w-[75%] bg-gray-300 rounded-[1rem] flex items-center py-2 px-4"
        >
          ${chatContent}
        </div>
      </div>`;
    askQuestion(chatContent);
    scrollBottom();
    setTimeout(() => {
      document.getElementById("chat").value = "";
    }, 100);
  }
}

document.getElementById("sendMessage").addEventListener("click", (e) => {
  sendMessage();
});

document.getElementById("chat").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    sendMessage();
  }
});

onLoad();

document.addEventListener("DOMContentLoaded", function (event) {
  scrollBottom();
});
