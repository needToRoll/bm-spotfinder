$index_file_content=Get-Content src\index.html
$maps_api_key=Get-Content .\maps-api.key -First 1
($index_file_content -replace '%MAPS_KEY_PLACEHOLDER%', $maps_api_key) | Out-File -encoding utf8 src\index.html
ng build --configuration=production
#firebase deploy
$index_file_content | Out-File -encoding utf8 src\index.html
