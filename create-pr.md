# Create Pull Request via GitHub API

To create a pull request using the GitHub API, you'll need a Personal Access Token.

## Steps:

1. **Get a GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name and select scope: `repo`
   - Copy the token

2. **Run this command (replace YOUR_TOKEN with your actual token):**

```powershell
$headers = @{
    "Authorization" = "token YOUR_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    title = "Merge dev-development into main"
    head = "dev-development"
    base = "main"
    body = "This PR merges all development work from dev-development branch into main, including:
- Project structure organization
- Admin dashboard with Figma design
- Homepage and login page
- UI consistency improvements
- Image assets restoration"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.github.com/repos/MickoAndrei/Societech_Financial_Report_And_Monitoring_System/pulls" -Method Post -Headers $headers -Body $body
```

## Or use curl (if available):

```bash
curl -X POST https://api.github.com/repos/MickoAndrei/Societech_Financial_Report_And_Monitoring_System/pulls \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "title": "Merge dev-development into main",
    "head": "dev-development",
    "base": "main",
    "body": "This PR merges all development work from dev-development branch into main."
  }'
```
