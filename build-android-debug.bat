@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 goto missingNode
if not exist "node_modules\@capacitor\cli\bin\capacitor" goto missingPackages
if not defined JAVA_HOME if exist "C:\Program Files\Android\Android Studio\jbr\bin\java.exe" set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "GRADLE_USER_HOME=%CD%\.cache\gradle"
set "ANDROID_USER_HOME=%CD%\.cache\android"
node scripts\build-web.cjs
if errorlevel 1 goto failed
node node_modules\@capacitor\cli\bin\capacitor sync android
if errorlevel 1 goto failed
node scripts\configure-android.cjs
if errorlevel 1 goto failed
pushd android
call gradlew.bat --no-daemon --max-workers=2 :app:assembleDebug
set "BUILD_RESULT=%ERRORLEVEL%"
popd
if not "%BUILD_RESULT%"=="0" goto failed
if not exist "android\app\build\outputs\apk\debug\app-debug.apk" goto failed
echo.
echo APK ready: %CD%\android\app\build\outputs\apk\debug\app-debug.apk
exit /b 0
:missingNode
echo ERROR: Install Node.js 22 or newer.
exit /b 1
:missingPackages
echo ERROR: Run npm ci first.
exit /b 1
:failed
echo ERROR: Android build stopped. Resolve the error above and retry.
exit /b 1
