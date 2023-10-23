from yahoo_oauth import OAuth2
import yahoo_fantasy_api as yfa

# Initialize OAuth2 and authenticate
oauth = OAuth2(None, None, from_file='oauth2.json')

if oauth.token_is_valid():
    print('valid token')
    
    # create game
    yahoo_fantasy_sports_game = yfa.Game(oauth, 'nba')
    # to get current league id
    # print(gm.league_ids())
    # can filter by year

    # create league
    league = yahoo_fantasy_sports_game.to_league('428.l.106817')
    # get my team from my user's team key
    team = league.to_team(league.team_key())

    print(team.roster())

    fa_pg = league.free_agents('PG')
    len(fa_pg)
    
    for i in range(5):
        player_name = fa_pg[i]['name']
        player_details = league.player_details(player_name)
        print(player_details)


    
    
    
    


'''
lg = gm.to_league('388.l.27081')
lg.stat_categories()
lg.team_key()
lg.current_week()
lg.end_week()
lg.week_date_range(12)
tm = lg.to_team('388.l.27081.t.5')
tm.roster(1)
fa_CF = lg.free_agents('CF')
len(fa_CF)
fa_CF[0]
'''

'''
from yahoo_oauth import OAuth2
import yahoo_fantasy_api as yfa

# Initialize OAuth2 and authenticate
oauth = OAuth2(None, None, from_file='oauth2.json')

# Check if the authentication was successful
if not oauth.token_is_valid():
    print("Authentication failed. Please check your OAuth2 credentials.")
else:
'''

