@echo off
echo Building React app...
cd src\client
call npm run build
cd ..\..

echo Copying build files to root...
xcopy "src\client\build\*" "." /E /Y /Q

echo Files ready for GitHub Pages deployment!
echo.
echo Next steps:
echo 1. Commit all changes: git add .
echo 2. Commit: git commit -m "Deploy React app to GitHub Pages"
echo 3. Push: git push origin main
echo.
echo Your app will be available at:
echo https://margajelast-collab.github.io/amchi-mumbai-ai/
echo https://margajelast-collab.github.io/amchi-mumbai-ai/#/translate
pause