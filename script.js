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
            // save image
            //imageUrls.push(`${teamData.logo[0].team_logo.url}`);

            // display data
            teamInfo.innerHTML += 
            `<ul>
                <li>Team Name: ${teamData.team_name}</li>
                <li>Manager: ${teamData.manager}</li>
                <li>Team ID: ${teamData.team_id}</li>
                <li>Team Key: ${teamData.team_key}</li>
                <li><a href=${teamData.url}>link</a></li>
                <li><img src=${teamData.logo[0].team_logo.url}></li>
                <li>Waiver priority: ${teamData.waiver_prio}</li>
                <li>FAAB Balance: ${teamData.faab_balance}</li>
                <li>Num moves: ${teamData.num_moves}</li>
                <li>Num trades: ${teamData.num_trades}</li>
            </ul>`;

            // roster table
            // stats and their meaning, probably incorrect
            
            /*
            let advStatsTable = `
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>+/- Plus-Minus</th>
                        <th>AR - Assist Rate</th>
                        <th>eFG% - Effective Shooting Percentage</th>
                        <th>FTR - Free Throw Rate</th>
                        <th>TOR - Turnover Rate</th>
                        <th>TS% - True Shooting Percentage</th>
                        <th>Usg% - Usage Percentage</th>
                        <th>WS - Win Shares</th>
                    </tr>
                </thead>
                <tbody>
            `;
            */
            /* 
                FGM     Field Goals Made
                FGA     Field Goals Attempted
                3PTM    3pt Field Goals Made
                PTS     Points
                REB     Rebounds
                AST     Assists
                ST      Steals
                BLK     Blocks
                TO      Turnovers
                PPG     Points Per Game 
                eFG%    Effective Field Goal Percentage
                FTR     Free Throw Rate
                TOR     Turnover Rate
                TS%     True Shooting Percentage
                Usg%    Usage Percentage
                WS      Win Shares
            */
            let statsTable = `
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>FGM</th>
                        <th>FGA</th>
                        <th>3PTM</th>
                        <th>PTS</th>
                        <th>REB</th>
                        <th>AST</th>
                        <th>ST</th>
                        <th>BLK</th>
                        <th>TO</th>
                        <th>PPG</th>
                        <th>eFG%</th>
                        <th>FTR</th>
                        <th>TOR</th>
                        <th>TS%</th>
                        <th>Usg%</th>
                        <th>WS</th>
                    </tr>
                </thead>
                <tbody>
            `;


            // loop through each player on roster
            for (const player of teamData.roster) {
                // this is always 7 but we have 8 adv stats from yahoo fantasy page
                
                // player name and position
                statsTable += `<tr>
                    <td>
                        ${player.name}, ${player.selected_position}
                    </td>
                `;
                // loop through each regular stat
                const num_stats = player.player_details[0].player_stats.stats.length;
                for (var i = 0; i < num_stats; i++) {
                    statsTable += `
                    <td>
                        ${player.player_details[0].player_stats.stats[i].stat.value}
                    </td>
                    `;
                }

                // loop through each advanced stat
                const num_adv_stats = player.player_details[0].player_advanced_stats.stats.length;
                for (var i = 0; i < num_adv_stats; i++) {
                    statsTable += `
                    <td>
                        ${player.player_details[0].player_advanced_stats.stats[i].stat.value}
                    </td>`;
                }
                statsTable += `</tr>`;
            }
            statsTable += `</tbody></table><br>`;

            // Set the HTML content in a single step
            teamInfo.innerHTML += statsTable;

        } else {
            teamInfo.innerHTML += `<p>Failed to load data from ${url}</p>`;
        }
    }
}



displayLeague();
displayTeams();


// Array of image URLs
const imageUrls = [
    'images/image0.jpg',
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image6.jpg',
    'images/image7.jpg',
    'images/image8.jpg',
    'images/image9.jpg',
    'images/image10.jpg',
    'images/image11.jpg'
];

// Function to create the grid of images
function createImageGrid() {
    const imageGrid = document.getElementById('imageGrid');

    //for (const imageUrl of imageUrls) {
    imageUrls.forEach(function(imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.addEventListener('click', () => {
            // Handle image click here
            console.log(`Clicked on ${imageUrl}`);
        });

        imageGrid.appendChild(image);
    });
}

// Call the function to create the grid when the page loads
window.addEventListener('load', createImageGrid);


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

/*
            teamInfo.innerHTML += 
            `
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>+/- Plus-Minus</th>
                        <th>AR - Assist Rate</th>
                        <th>eFG% - Effective Shooting Percentage</th>
                        <th>FTR - Free Throw Rate</th>
                        <th>TOR - Turnover Rate</th>
                        <th>TS% - True Shooting Percentage</th>
                        <th>Usg% - Usage Percentage</th>
                        <th>WS - Win Shares</th>
                    </tr>
                </thead>
                <tbody>
            `;
            // loop through each player on roster
            for (const player of teamData.roster) {
            //teamData.roster.forEach((player) => {
                // this is always 7
                const num_adv_stats = player.player_details[0].player_advanced_stats.stats.length
                teamInfo.innerHTML += `<tr>`;
                // player name and position
                teamInfo.innerHTML += 
                `
                    <td>
                        ${player.name}, ${player.selected_position}
                    </td>
                `;
                // loop through each advanced stat
                for (var i = 0; i < num_adv_stats; i++) {
                    teamInfo.innerHTML +=
                    `
                    <td>
                        ${player.player_details[0].player_advanced_stats.stats[i].stat.value}
                    </td>
                    `;
                }
                teamInfo.innerHTML += `</tr>`;
            }
            teamInfo.innerHTML += `</tbody></table><br>`;
            */

            /*
            teamInfo.innerHTML += `<p>Roster:</p><ul>`
            for (const player of teamData.roster) {
                const num_adv_stats = player.player_details[0].player_advanced_stats.stats.length
                teamInfo.innerHTML += 
                `<li>
                    ${player.name}, ${player.selected_position},
                `;
                for (var i = 0; i < num_adv_stats; i++) {
                    teamInfo.innerHTML +=
                    ` ${player.player_details[0].player_advanced_stats.stats[i].stat.value},
                    `;
                }    
            teamInfo.innerHTML += `</li>`;
            }
            teamInfo.innerHTML += `</ul><br>`
            */