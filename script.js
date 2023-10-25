// function to load our JSON files

function loadJSON() {
    // make http request to load JSON file
    var request = new XMLHttpRequest();
    request.open("GET", "sampledata.json", true);

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            // parse the JSON response
            var jcontent = JSON.parse(request.responseText);
            // display data
            var output = document.getElementById('output');
            output.innerHTML = "Week: " + jcontent.current_week;
        }
    };

    request.send();
}

/*
function loadJSON() {
    fetch("sampledata.json")
        .then(response => response.json())
        .then(data => {
            var output = document.getElementById('output');
            output.innerHTML = "Week: " + data.current_week;
        })
        .catch(error => console.error('Error:', error));
}
*/

// call the function to load and display json data
loadJSON();
