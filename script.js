// to load any json file
function loadJSON(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}


async function displayLeague() {
    const url = "data/leagueData.json"
    const leagueInfo = document.getElementById('leagueInfo');
    const leagueData = await loadJSON(url);

    if (leagueData) {
        leagueInfo.innerHTML = "Week: " + leagueData.current_week + " League ID: " + leagueData.league_id + " Num teams: " + leagueData.num_teams;
    } else {
        leagueInfo.innerHTML = `<p>Failed to load data from ${url}</p>`
    }    
}

async function displayTeams() {
    const urls = [];
    const numTeams = 12; // Change this to the desired number of URLs
    for (let i = 0; i < numTeams; i++) {
        urls.push(`/data/teamData${i}.json`);
    }

    const teamInfo = document.getElementById('teamInfo');
    
    for (const url of urls) {
        const teamData = await loadJSON(url);
        //console.log(url);
        if (teamData) {
            // display data
            teamInfo.innerHTML += 
            `<ul>
                <li>Team Name: ${teamData.team_name}</li>
                <li>Team ID: ${teamData.team_id}</li>
                <li>Team Key: ${teamData.team_key}</li>
                <li><a href=${teamData.url}>link</a></li>
                <li><img src=${teamData.logo[0].team_logo.url}></li>
                <li>Waiver priority: ${teamData.waiver_prio}</li>
                <li>FAAB Balance: ${teamData.faab_balance}</li>
                <li>Num moves: ${teamData.num_moves}</li>
                <li>Num trades: ${teamData.num_trades}</li>
            </ul>
            <br>`;
        } else {
            teamInfo.innerHTML += `<p>Failed to load data from ${url}</p>`;
        }
    }
}


displayLeague();
displayTeams();


/*
function displayLeague()) {
    fetch("leagueData.json")
        .then(response => response.json())
        .then(leagueData => {
            var leagueInfo = document.getElementById('leagueInfo');
            leagueInfo.innerHTML = "Week: " + leagueData.current_week + " League ID: " + leagueData.league_id + " Num teams: " + leagueData.num_teams;
        })
        .catch(error => console.error('Error:', error));
}

async function loadAndDisplayJSON() {
    const urls = ["data1.json", "data2.json", "data3.json"]; // Add the URLs of your JSON files here
    const output = document.getElementById('output');

    for (const url of urls) {
        const data = await loadJSON(url);
        if (data) {
            // Display or process the data here
            output.innerHTML += `<p>Data from ${url} - First Name: ${data.firstName}, Last Name: ${data.lastName}</p>`;
        } else {
            output.innerHTML += `<p>Failed to load data from ${url}</p>`;
        }
    }
}

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
*/