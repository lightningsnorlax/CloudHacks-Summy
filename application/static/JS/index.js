// Your JavaScript code
var links = [1];

$("#new").click(() => {
    if (links.length === 0) {
        links = [1];
    } else {
        links.push(parseInt(links.slice(-1)) + 1);
    }
    console.log(links)
    $("#insert-into-link").append(`
<div class="flex my-4 changeing-link">
    <div class="flex-none linking-number w-fit py-2 px-4 rounded-full">
        <p class="text-center align-middle m-2 font-bold text-lg">${parseInt(links.slice(-1))}</p>
    </div>
    <input placeholder="link"
        class="placeholder:bold placeholder:text-lg placeholder:text-white flex-1 linking-container py-2 px-5 rounded-full ms-5"></input>
    <button class="flex-none ms-4 linking-cancel w-fit py-2 px-4 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-8 h-8 stroke-2 my-auto middle-align">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</div>`);
    cancel()
});

function increaseNumbersAboveIndex(arr, index) {
    // Remove the current number at the given index
    arr.splice(index, 1);

    // Decrease the numbers above the given index
    for (let i = index; i < arr.length; i++) {
        arr[i] = arr[i] - 1;
    }
    console.log(arr);
    return arr;
}

let cancel = () => {
    // Unbind previous click event handlers
    $(".linking-cancel").off("click");

    $(".linking-cancel").on("click", (e) => {
        const targetIndex = parseInt($(e.currentTarget.parentNode).find(".linking-number").text()) - 1;
        links = increaseNumbersAboveIndex(links, targetIndex);
        console.log(links);
        $(e.currentTarget.parentNode).remove();

        // Loop through each element with class "changeing-link" and update the ".linking-number" text
        $(".changeing-link").each(function (i) {
            const linkingNumberElement = $(this).find(".linking-number");
            linkingNumberElement.html(`<p class="text-center align-middle m-2 font-bold text-lg">${links[i]}</p>`);
            console.log(links)
        });
    });
}

cancel()
