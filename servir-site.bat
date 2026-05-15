@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Pasta do site: %cd%
echo  Endereco: http://127.0.0.1:8765/
echo  Para parar: feche esta janela ou Ctrl+C
echo.

where python >nul 2>&1
if %errorlevel%==0 goto :srv

where py >nul 2>&1
if %errorlevel%==0 goto :srvpy

where npx >nul 2>&1
if %errorlevel%==0 goto :srvnpm

echo  Nem Python nem Node (npx) foram encontrados.
echo  Este site funciona offline: abra o arquivo index.html diretamente
echo  (ele ja inclui CSS e JavaScript no mesmo arquivo).
echo.
echo    %cd%\index.html
echo.
pause
exit /b 1

:srvnpm
echo  Subindo servidor com npx serve...
start "" cmd /c "ping -n 6 127.0.0.1 >nul & start http://127.0.0.1:8765/"
npx --yes serve -l 8765 .
goto :eof

:srvpy
start "" cmd /c "ping -n 3 127.0.0.1 >nul & start http://127.0.0.1:8765/"
py -m http.server 8765
goto :eof

:srv
start "" cmd /c "ping -n 3 127.0.0.1 >nul & start http://127.0.0.1:8765/"
python -m http.server 8765
