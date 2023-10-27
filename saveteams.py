from yahoo_oauth import OAuth2
import yahoo_fantasy_api as yfa
import json

# Initialize OAuth2 and authenticate
oauth = OAuth2(None, None, from_file='oauth2.json')

if oauth.token_is_valid():
    #print('valid token')
    
    # create game
    yahoo_fantasy_sports_game = yfa.Game(oauth, 'nba')
    # to get current league id
    #print(yahoo_fantasy_sports_game.league_ids(2023))
    # can filter by year
    league_id = yahoo_fantasy_sports_game.league_ids(2023)[0]
    #print("League ID: ", league_id)

    # create league
    league = yahoo_fantasy_sports_game.to_league(league_id)
    
    #print("Current week: ", league.current_week())
    all_teams = league.teams()
    num_teams = len(all_teams)
    #print("Number of teams in league: ", num_teams)
    #print()

    league_data = {
        "league_id": league_id,
        "current_week": league.current_week(),
        "num_teams": num_teams
    }

    # convert the dictionary to JSON string
    json_string = json.dumps(league_data)
    # save to file
    file_path = "leagueData.json"
    with open(file_path, "w") as json_file:
        json_file.write(json_string)
    
    for index, team_id in enumerate(all_teams):
        #print(index)
        #print(all_teams[team_id].keys())
        team = all_teams[team_id]
        #print(team.keys())
        #print("Team key: ", team['team_key'])
        #print("Team ID: ", team_id)
        #print("Team name: ", team['name'])
        #print("URL: ", team['url'])
        #print("Logo: ", team['team_logos'])
        #print("Waiver priority: ", team['waiver_priority'])
        #print("FAAB balance: ", team['faab_balance'])
        #print("Num moves: ", team['number_of_moves'])
        #print("Num trades: ", team['number_of_trades'])

        team_data = {
            "team_key": team['team_key'],
            "team_id": team_id,
            "team_name": team['name'],
            "url": team['url'],
            "logo": team['team_logos'],
            "waiver_prio": team['waiver_priority'],
            "faab_balance": team['faab_balance'],
            "num_moves": team['number_of_moves'],
            "num_trades": team['number_of_trades'],
            "roster": league.to_team(team_id).roster()
        }
        
        #print("Roster: \n")
        # confusing part where this is how you get the team class
        # but team details aren't in the team class, they are in the team dict
        
        #roster = league.to_team(team_id).roster()
        # print(roster)
        for i, player in enumerate(team_data["roster"]):
            player_id = player['player_id']
            #print("Player ID: ", player_id)
            #print("Name: ", player['name'])
            #print("Status: ", player['status'])
            #print("Position type: ", player['position_type'])
            #print("Elegible positions: ", player['eligible_positions'])
            #print("Selected position: ", player['selected_position'])
            #print(i)
            # push player details and stats into dict
            team_data["roster"][i]["player_details"] = league.player_details(player_id)
            team_data["roster"][i]["player_stats"] = league.player_stats(player_id, 'lastweek')
            
            #team_data[roster[i][i].player_details = league.player_details(player_id)
            #team_data[roster][i].player_stats = league.player_stats(player_id, 'season')

            # details
            #player_details = league.player_details(player_id)
            #print(player_details)
            # stats
            #player_stats = league.player_stats(player_id, 'lastweek')
            #print(player_stats)
        
        # convert the dictionary to JSON string
        json_string = json.dumps(team_data)
        # save to file
        file_path = "data/teamData" + str(index) + ".json"
        with open(file_path, "w") as json_file:
            json_file.write(json_string)
        
        #print("Roster adds: ", team['roster_adds'])
        #print("League scoring type: ", team['league_scoring_type'])
        #print("Has draft grade: ", team['has_draft_grade'])
        #print("Managers: ", team['managers'])
        #print()


        
    
    # fix runtime request length

    '''
    Valid values are: ‘season’, ‘average_season’, ‘lastweek’, ‘lastmonth’, ‘date’, ‘week’.

    {'player_id': 4612, 'name': 'Stephen Curry', 'status': '', 'position_type': 'P', 'eligible_positions': ['PG', 'Util'], 'selected_position': 'PG'}
    
    dict_keys(['team_key', 'team_id', 'name', 'url', 'team_logos', 'waiver_priority', 'faab_balance', 'number_of_moves', 'number_of_trades', 'roster_adds', 'league_scoring_type', 'has_draft_grade', 'managers'])
    '''


    '''
    league -> all teams in league
    get roster
    print team name
    print player
    '''
    #current_team = league.to_team(league.team_key())

    '''
    +/- - Plus-Minus  
    AR - Assist Rate  
    eFG% - Effective Shooting Percentage 
    FTR - Free Throw Rate 
    TOR - Turnover Rate 
    TS% - True Shooting Percentage
    Usg% - Usage Percentage
    WS - Win Shares
    '''