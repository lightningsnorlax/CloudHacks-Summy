link_list = localStorage.getItem("links");
console.log(link_list)

async function askQuestion(question) {
    generatingText = true;
    console.log("ask Question");
    document.getElementById("chatBody").innerHTML += `
      <div class="flex items-center gap-2 loading">
        <img src="./img/Summy.png" class="aspect-square w-8 self-end" />
        <div
          class="w-fit max-w-[75%] bg-gray-300 rounded-[1rem] py-2 px-4 min-h-[18px] chatAnswer"
        >
          <div class="flex items-center ">
            <span class="circle bouncing"></span>
            <span class="circle bouncing"></span>
            <span class="circle bouncing"></span>
          </div>
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