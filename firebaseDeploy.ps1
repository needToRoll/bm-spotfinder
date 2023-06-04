$index_file_content=Get-Content src\index.html
if ($args.Count -gt 0 -and ($args[0] -eq 'prod' -or $args[0] -eq 'production'))
{
  $maps_api_key=Get-Content .\maps-api.key -First 1
  ($index_file_content -replace '%MAPS_KEY_PLACEHOLDER%', $maps_api_key) | Out-File -encoding utf8 src\index.html
  ng build --configuration=production
  firebase deploy --only hosting:prod
  $index_file_content | Out-File -encoding utf8 src\index.html
}
else
{
  $maps_api_key=Get-Content .\maps-test-api.key -First 1
  ($index_file_content -replace '%MAPS_KEY_PLACEHOLDER%', $maps_api_key) | Out-File -encoding utf8 src\index.html
  ng build --configuration=test
  firebase deploy --only hosting:test
  $index_file_content | Out-File -encoding utf8 src\index.html
}
