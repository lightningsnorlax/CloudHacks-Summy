const hostname = "http://localhost:5000/";

async function getSummary(urlinput) {
    var url = urlinput;
    return fetch(`${hostname}/getSummary`, {
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
        console.log(data);
        return data;
    })
    .catch((error) => {
        console.log(error);
        throw error; // Rethrow the error so it can be handled in the calling function if needed.
    });
}

async function onLoad() {


}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

$("#form-links").on("submit", async (e) => {
    e.preventDefault()
    var link_list = [];
    var fetchPromises = [];

    for (var i of $(".search-link")) {
        var urlLink = $(i).val();
        if (validURL(urlLink)) {
            fetchPromises.push(getSummary(urlLink));
            link_list.push({ link: urlLink });
        }
    }

    for (var i = 0; i < link_list.length; i++) {
        try {
            const summaries = await Promise.all(fetchPromises);
            console.log(summaries[i]["summary"]);
            console.log(link_list[i]["link"]);
            localStorage.setItem("links", JSON.stringify(link_list));
            $("#insert-summary").append(`<h2 class="mb-1 font-bold">${link_list[i]["link"]}</h2><p class="mb-5">${summaries[i]["summary"]}</p>`); // Assuming summaries is an array of strings.
        } catch (error) {
            console.error(error);
            // Handle the error if needed.
        }
    }
    
});