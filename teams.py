from yahoo_oauth import OAuth2
import yahoo_fantasy_api as yfa

# Initialize OAuth2 and authenticate
oauth = OAuth2(None, None, from_file='oauth2.json')

LEAGUE_SIZE = 12

if oauth.token_is_valid():
    print('valid token')
    
    # create game
    yahoo_fantasy_sports_game = yfa.Game(oauth, 'nba')
    # to get current league id
    #print(yahoo_fantasy_sports_game.league_ids(2023))
    # can filter by year
    league_id = yahoo_fantasy_sports_game.league_ids(2023)[0]
    print("League ID: ", league_id)

    # create league
    league = yahoo_fantasy_sports_game.to_league(league_id)
    
    print("Current week: ", league.current_week())
    all_teams = league.teams()
    num_teams = len(all_teams)
    print("Number of teams in league: ", num_teams)
    print()
    
    for team_id in all_teams:
        #print(all_teams[team_id].keys())
        team = all_teams[team_id]
        #print(team.keys())
        print("Team key: ", team['team_key'])
        print("Team ID: ", team_id)
        print("Team name: ", team['name'])
        print("URL: ", team['url'])
        print("Logo: ", team['team_logos'])
        print("Waiver priority: ", team['waiver_priority'])
        print("FAAB balance: ", team['faab_balance'])
        print("Num moves: ", team['number_of_moves'])
        print("Num trades: ", team['number_of_trades'])
        print("Roster: \n")
        # confusing part where this is how you get the team class
        # but team details aren't in the team class, they are in the team dict
        roster = league.to_team(team_id).roster()
        # print(roster)
        for player in roster:
            player_id = player['player_id']
            print("Player ID: ", player_id)
            print("Name: ", player['name'])
            print("Status: ", player['status'])
            print("Position type: ", player['position_type'])
            print("Elegible positions: ", player['eligible_positions'])
            print("Selected position: ", player['selected_position'])
            # details
            player_details = league.player_details(player_id)
            print(player_details)
            # stats
            player_stats = league.player_stats(player_id, 'lastweek')
            print(player_stats)


            print()
        #print("Roster adds: ", team['roster_adds'])
        #print("League scoring type: ", team['league_scoring_type'])
        #print("Has draft grade: ", team['has_draft_grade'])
        #print("Managers: ", team['managers'])
        print()
    
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
