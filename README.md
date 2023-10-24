# basketball data analysis
fantasy basketball from yahoo

using yahoo_oath package to make integrating with the oauth services easier -> https://yahoo-fantasy-api.readthedocs.io/

### stat categories

```
{'display_name': 'FGM', 'position_type': 'P'}, 
{'display_name': 'FGA', 'position_type': 'P'}, 
{'display_name': '3PTM', 'position_type': 'P'}, 
{'display_name': 'PTS', 'position_type': 'P'}, 
{'display_name': 'REB', 'position_type': 'P'}, 
{'display_name': 'AST', 'position_type': 'P'}, 
{'display_name': 'ST', 'position_type': 'P'}, 
{'display_name': 'BLK', 'position_type': 'P'}, 
{'display_name': 'TO', 'position_type': 'P'}
```

- FGM: field goals made (+2)
- FGA: field goal attemps (-1)
- 3PTM: 3 pointer field goals made (+1)
- PTS: points (+1)
- REB: rebounds (+1)
- AST: assists (+2)
- ST: steals (+4)
- BLK: blocks (+4)
- TO: turn overs (-2)

### player details
```
[{
'player_key': '428.p.3930', 
'player_id': '3930', 
'name': {
    'full': 'Chris Paul', 
    'first': 'Chris', 
    'last': 'Paul', 
    'ascii_first': 
    'Chris', 'ascii_last': 'Paul'
}, 
'url': 'https://sports.yahoo.com/nba/players/3930', 
'editorial_player_key': 'nba.p.3930', 
'editorial_team_key': 'nba.t.9', 
'editorial_team_full_name': 'Golden State Warriors', 
'editorial_team_abbr': 'GSW', 
'editorial_team_url': 'https://sports.yahoo.com/nba/teams/golden-state/', 
'is_keeper': {
    'status': False, 
    'cost': False, 
    'kept': False
}, 
'uniform_number': '3', 
'display_position': 'PG', 
'headshot': {
    'url': 'https://s.yimg.com/iu/api/res/1.2/SPiSd5BWLCT3lbuL4SBUUw--~C/YXBwaWQ9eXNwb3J0cztjaD0yMzM2O2NyPTE7Y3c9MTc5MDtkeD04NTc7ZHk9MDtmaT11bGNyb3A7aD02MDtxPTEwMDt3PTQ2/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10132023/3930.png', 
    'size': 'small'
}, 
'image_url': 'https://s.yimg.com/iu/api/res/1.2/SPiSd5BWLCT3lbuL4SBUUw--~C/YXBwaWQ9eXNwb3J0cztjaD0yMzM2O2NyPTE7Y3c9MTc5MDtkeD04NTc7ZHk9MDtmaT11bGNyb3A7aD02MDtxPTEwMDt3PTQ2/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10132023/3930.png', 
'is_undroppable': '0', 
'position_type': 'P', 
'primary_position': 'PG', 
'eligible_positions': [
    {'position': 'PG'}, 
    {'position': 'Util'}
], 
'has_player_notes': 1, 
'player_notes_last_timestamp': 1697910607, 
'player_stats': {
    '0': {
        'coverage_type': 'season', 
        'season': '2023'
    }, 
    'stats': [
        {'stat': {'stat_id': '4', 'value': '-'}}, 
        {'stat': {'stat_id': '3', 'value': '-'}}, 
        {'stat': {'stat_id': '10', 'value': '-'}}, 
        {'stat': {'stat_id': '12', 'value': '-'}}, 
        {'stat': {'stat_id': '15', 'value': '-'}}, 
        {'stat': {'stat_id': '16', 'value': '-'}}, 
        {'stat': {'stat_id': '17', 'value': '-'}}, 
        {'stat': {'stat_id': '18', 'value': '-'}}, 
        {'stat': {'stat_id': '19', 'value': '-'}}
    ]
}, 
'player_advanced_stats': {
    '0': {
        'coverage_type': 'season', 
        'season': '2023'
        }, 
    'stats': [
            {'stat': {'stat_id': '1001', 'value': '-'}}, 
            {'stat': {'stat_id': '1006', 'value': '-'}}, 
            {'stat': {'stat_id': '1007', 'value': '-'}}, 
            {'stat': {'stat_id': '1008', 'value': '-'}}, 
            {'stat': {'stat_id': '1011', 'value': '-'}}, 
            {'stat': {'stat_id': '1012', 'value': '-'}}, 
            {'stat': {'stat_id': '1013', 'value': '-'}}
        ]
}, 
'player_points': {
    '0': {
        'coverage_type': 'season', 
        'season': '2023'}, 
        'total': 0
    }
}]
```

## player stats
```
[{'player_id': 6420, 
'name': 'Jaden McDaniels', 
'position_type': 'P', 
'FGA': '-', 
'FGM': '-', 
'3PTM': '-', 
'PTS': '-', 
'REB': '-', 
'AST': '-', 
'ST': '-', 
'BLK': '-', 
'TO': '-'}]
```