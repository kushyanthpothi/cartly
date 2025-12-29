
$ErrorActionPreference = "Stop"

Write-Output "Testing Login..."
try {
    $url = "http://localhost:8080/api/users/login?email=kushyanthpothineni2003%40gmail.com&password=Kushyanth%402003"
    $res = Invoke-RestMethod -Uri $url -Method Post -Body ""
    $res | ConvertTo-Json -Depth 5 | Out-File "login.json" -Encoding utf8
    Write-Output "Login Success"
} catch {
    Write-Output "Login Failed"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $reader.ReadToEnd() | Out-File "login_error.txt" -Encoding utf8
    } else {
        $_.Exception.Message | Out-File "login_error.txt" -Encoding utf8
    }
}

Write-Output "Testing Cart Query Param..."
try {
    $res = Invoke-RestMethod -Uri "http://localhost:8080/api/cartStatus?userId=5" -Method Get
    $res | ConvertTo-Json -Depth 5 | Out-File "cart_query.json" -Encoding utf8
    Write-Output "Cart Query Success"
} catch {
    Write-Output "Cart Query Failed"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $reader.ReadToEnd() | Out-File "cart_query_error.txt" -Encoding utf8
    } else {
        $_.Exception.Message | Out-File "cart_query_error.txt" -Encoding utf8
    }
}

Write-Output "Testing Cart Path Param..."
try {
    $res = Invoke-RestMethod -Uri "http://localhost:8080/api/cartStatus/user/5" -Method Get
    $res | ConvertTo-Json -Depth 5 | Out-File "cart_path.json" -Encoding utf8
    Write-Output "Cart Path Success"
} catch {
    Write-Output "Cart Path Failed"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $reader.ReadToEnd() | Out-File "cart_path_error.txt" -Encoding utf8
    } else {
        $_.Exception.Message | Out-File "cart_path_error.txt" -Encoding utf8
    }
}
