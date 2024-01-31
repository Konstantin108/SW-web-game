<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="user-scalable=no">
    <link rel="stylesheet" href="./styles/styles.css">
    <script src="https://kit.fontawesome.com/4bd251a57a.js" crossorigin="anonymous"></script>
    <script src="./dist/hammer.min.js"></script>
    <script src="./scripts/game.js" type="module"></script>
    <title>Space Shooter</title>
</head>
<body>
<div id="wrapper">
    <canvas></canvas>
</div>
<div id="loadingScreen">
    <h1 id="loadingScreenTitle">
        loading
        <span id="dotFirst" class="dot">.</span>
        <span id="dotSecond" class="dot">.</span>
        <span id="dotThird" class="dot">.</span>
    </h1>
</div>
<div id="container"></div>
</body>
</html>