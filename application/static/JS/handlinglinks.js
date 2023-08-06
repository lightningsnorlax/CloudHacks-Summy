const hostname = "http://localhost:5000/";

async function getSummary(urlinput) {

    var url = urlinput;
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
            console.log(data);
            return data
        })
        .catch((error) => {
            if (error) {
                console.log(error);
            }
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
    console.log($(".search-link"))
    var link_list = []
    for (var i of $(".search-link")) {
        console.log(i)
        var urlLink = $(i).val();
        if (validURL(urlLink)) {
            summary = await getSummary(urlLink)
            console.log(summary)
            link_list.push({link: urlLink})
        } 
        
    }
    localStorage.setItem("links", `${JSON.stringify(link_list)}`);
    $("#insert-summary").html(summary)
})
