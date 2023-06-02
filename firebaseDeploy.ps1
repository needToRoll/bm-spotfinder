$maps_api_key = Get-Content .\maps-api.key -First 1
((Get-Content src\index.html) -replace '%MAPS_KEY_PLACEHOLDER%', $maps_api_key) | Out-File -encoding utf8 index.html
ng build --configuration = production
firebase deploy
