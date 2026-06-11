@echo off
echo ======================================
echo  Rudra Portfolio - GitHub Push Script
echo ======================================
echo.

cd /d "c:\Users\dell\OneDrive\Desktop\portfolio"

echo [1/6] Initializing git repository...
git init

echo [2/6] Setting branch to main...
git branch -M main

echo [3/6] Adding GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Rudra-Narayan-Swain/portfolio.git

echo [4/6] Staging all files...
git add .

echo [5/6] Creating first commit...
git commit -m "feat: Premium developer portfolio for Rudra Narayan Swain"

echo [6/6] Pushing to GitHub...
git push -u origin main

echo.
echo ======================================
echo  DONE! Your portfolio is on GitHub.
echo  Enable GitHub Pages:
echo  Go to: https://github.com/Rudra-Narayan-Swain/portfolio/settings/pages
echo  Set source: Branch = main, Folder = / (root)
echo  Your URL will be: https://rudra-narayan-swain.github.io/portfolio/
echo ======================================
pause
