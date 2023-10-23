from yahoo_oauth import OAuth2
import yahoo_fantasy_api as yfa

# Initialize OAuth2 and authenticate
oauth = OAuth2(None, None, from_file='oauth2.json')

if oauth.token_is_valid():
    print('valid token')
    
    # create game
    yahoo_fantasy_sports_game = yfa.Game(oauth, 'nba')
    # to get current league id
    print(yahoo_fantasy_sports_game.league_ids(2022))
    # can filter by year

    # create league
    league = yahoo_fantasy_sports_game.to_league('418.l.97996')
    # get my team from my user's team key
    team = league.to_team(league.team_key())

    print(team.roster())

    fa_pg = league.free_agents('PG')
    len(fa_pg)
    
    for i in range(5):
        player_name = fa_pg[i]['name']
        player_details = league.player_details(player_name)
        print(player_details)
    