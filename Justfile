set shell := ["pwsh.exe", "-c"]

venv:
    pwsh.exe -NoExit -Command ". ./.venv/Scripts/Activate.ps1"
