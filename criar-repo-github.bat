@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Verificando login no GitHub (gh auth)...

gh auth status >nul 2>&1
if errorlevel 1 (
  echo.
  echo Você precisa entrar uma vez na sua conta GitHub.
  echo Execute no terminal CMD ou PowerShell (nesta pasta^):
  echo   gh auth login
  echo.
  echo Escolha: GitHub.com  ^|^  HTTPS  ^|^  Login com navegador
  echo Depois feche esta janela e execute este .bat de novo.
  pause
  exit /b 1
)

echo.
echo Criando repositório público ^"imc-diesel-engenharia-frotas^" e enviando o código...

gh repo create imc-diesel-engenharia-frotas --public --description "Site institucional - IMC Diesel Engenharia de Frotas" --source=. --remote=origin --push

if errorlevel 1 (
  echo.
  echo Falhou (talvez já exista remoto ou repositório com esse nome^.^)
  echo Se já criou antes, tente: git remote -v ^&^& git push -u origin main
  pause
  exit /b 1
)

echo.
echo Pronto. Veja acima o link https://github.com/... ou abra sua conta GitHub para localizar ^"imc-diesel-engenharia-frotas^".
pause
