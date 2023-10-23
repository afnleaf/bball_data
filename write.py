from yahoo_oauth import OAuth2
import json

creds = {'consumer_key': 'my_key', 'consumer_secret': 'my_secret'}
json_file_path = 'oauth2.json'  # Provide the path to the JSON file

with open(json_file_path, "w") as f:
    f.write(json.dumps(creds))

oauth = OAuth2(None, None, from_file=json_file_path)