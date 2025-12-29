
$ErrorActionPreference = "Stop"

# 1. Print all users to identify the correct email
Write-Output "--- ALL USERS ---"
try {
    $users = Invoke-RestMethod -Uri "http://localhost:8080/api/users" -Method Get
    $users | ConvertTo-Json -Depth 2
} catch {
    Write-Output "Failed to fetch users: $_"
}

# 2. Test Login function
function Test-Login ($email, $password) {
    Write-Output "`n--- Testing Login for: $email ---"
    
    # Manually encode for safety, although Invoke-RestMethod handles basic stuff
    # But for the URL query param, we want to be sure.
    # [System.Web.HttpUtility]::UrlEncode is not always available in core without loading assembly
    # So we trust the user provided string is what we want to send, or use Uri.EscapeDataString
    
    $encodedEmail = [Uri]::EscapeDataString($email)
    $encodedPassword = [Uri]::EscapeDataString($password)
    
    $url = "http://localhost:8080/api/users/login?email=$encodedEmail&password=$encodedPassword"
    Write-Output "URL: $url"
    
    try {
        $res = Invoke-RestMethod -Uri $url -Method Get
        Write-Output "SUCCESS (GET)! Response:"
        $res | ConvertTo-Json
    } catch {
         Write-Output "FAILURE. Status: $($_.Exception.Response.StatusCode)"
         # Try to read response body
         if ($_.Exception.Response) {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $body = $reader.ReadToEnd()
            Write-Output "Body: $body"
         }
    }
}

Test-Login "kushyanthpothineni2003@gmail.com" "Kushyanth@2003"
Test-Login "kushyanthpothineni2003@gmail" "Kushyanth@2003"
