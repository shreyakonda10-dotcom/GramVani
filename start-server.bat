@echo off
title GramVani Local Server Launcher
echo ===================================================
echo   GramVani - Smart Rural Community Platform
echo   Launching local server on http://localhost:8000
echo ===================================================
echo.

where node >nul 2>nul
if %errorlevel% == 0 (
    echo Starting server with Node.js...
    start "" http://localhost:8000
    node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=req.url==='/'?'index.html':req.url.slice(1);let p=path.join(__dirname,f);if(fs.existsSync(p)){let ext=path.extname(p);let ct='text/html';if(ext==='.css')ct='text/css';if(ext==='.js')ct='application/javascript';res.writeHead(200,{'Content-Type':ct});fs.createReadStream(p).pipe(res);}else{res.writeHead(404);res.end('Not found');}}).listen(8000,()=>console.log('GramVani running at http://localhost:8000 (Press Ctrl+C to stop)'));"
    goto end
)

where python >nul 2>nul
if %errorlevel% == 0 (
    echo Starting server with Python...
    start "" http://localhost:8000
    python -m http.server 8000
    goto end
)

echo Neither Node.js nor Python detected. Opening index.html directly in browser...
start "" "index.html"

:end

