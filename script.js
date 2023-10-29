// to load any json file
function loadJSON(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}

// to display basic league info
async function displayLeague() {
    const url = "data/leagueData.json"
    const leagueInfo = document.getElementById('leagueInfo');
    const leagueData = await loadJSON(url);

    if (leagueData) {
        leagueInfo.innerHTML = 
        `
            <h2>Week ${leagueData.current_week}</h2>
            <p>League ID: ${leagueData.league_id}</p>
            <p>Num teams: ${leagueData.num_teams}</p>
        `;
    } else {
        leagueInfo.innerHTML = `<p>Failed to load data from ${url}</p>`
    }    
}

// Add an event listener to the "Go Back" button when the page loads
function addGoBackEventListener() {
    const goBackButton = document.getElementById("goBack");
    const menu = document.getElementById("menu");
    const teamInfo = document.getElementById('teamInfo');

    goBackButton.addEventListener("click", () => {
        console.log("test");
        menu.style.display = "block";
        teamInfo.style.display = "none";
    });
}

// display single team by passed index
async function displayTeam(index) {
    // get url of json for team from index
    const url = `/data/teamData${index}.json`
    const teamInfo = document.getElementById('teamInfo');
    // clear old teaminfo
    teamInfo.innerHTML = "";
    teamInfo.style.display = "block";

    // add go back button
    teamInfo.innerHTML += `<button id="goBack">Go Back</button>`;

    // load team data
    const teamData = await loadJSON(url);
    if (teamData) {
        // display data
        teamInfo.innerHTML += 
        `   
            <hr>
            <br>
            <img src=${teamData.logo[0].team_logo.url}>
            <h3>${teamData.team_name}</h3>
            <h4>Managed by: ${teamData.manager}</h4>
        `;

        // roster table
        // stats and their meaning
        // advanced stats are likely incorrect, except for plus/minus
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
            +/-     Plus/Minus 
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
                    <th>Position</th>
                    <th>FGM</th>
                    <th>FGA</th>
                    <th>3PTM</th>
                    <th>PTS</th>
                    <th>REB</th>
                    <th>AST</th>
                    <th>ST</th>
                    <th>BLK</th>
                    <th>TO</th>
                    <th>+/-</th>
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
                    ${player.name} 
                </td>
                <td>
                    ${player.selected_position}
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
        statsTable += `</tbody></table><br><br><br>`;

        // Set the HTML content in a single step
        teamInfo.innerHTML += statsTable;
        addGoBackEventListener();

    } else {
        teamInfo.innerHTML += `<p>Failed to load data from ${url}</p>`;
    }
}

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
    const menu = document.getElementById('menu');

    //for (const imageUrl of imageUrls) {
    imageUrls.forEach(function(imageUrl, i) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.addEventListener('click', () => {
            // Handle image click here
            //console.log(`Clicked on ${imageUrl}`);
            menu.style.display = "none";
            displayTeam(i);
        });
        imageGrid.appendChild(image);
    });
}

displayLeague();
// Call the function to create the grid when the page loads
window.addEventListener('load', createImageGrid);


