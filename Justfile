set windows-shell := ["pwsh.exe", "-c"]

venv:
    pwsh.exe -NoExit -Command ". ./.venv/Scripts/Activate.ps1"

lint:
    uvx ruff check

format:
    uvx ruff format

typecheck:
    uvx pyright

devenv:
    devenv shell -v
