@echo off
rem ショートカット作成→プロパティ→実行時の大きさ：最小化でストレスフリー

set SLEEPTIME = 280

:loop
    cscript //nologo pressKey.vbs
    timeout /t %SLEEPTIME% > nul
goto :loop