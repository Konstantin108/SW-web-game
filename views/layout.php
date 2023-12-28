<?php global $title, $content; ?>
<!doctype html>
<html lang="en">
<head>
    <!--    возможно вынести head в отдельный template-->
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="Image/x-icon" href="/favicon.ico" rel="icon">
    <link rel="stylesheet" href="/styles/styles.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
            integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <title><?= $title; ?></title>
</head>
<body>
<header>
    <?php include "views/components/header.php"; ?>
</header>
<main>
    <div id="content">
        <?= $content; ?>
    </div>
</main>
<footer>
    <!--    тут тоже будет JS, возможно не подключать компоненты в PHP-->
    <?php include "views/components/footer.php"; ?>
</footer>
<?php if (AJAX_TRANSITION): ?>
    <script src="/js/getRequest.js" type="text/javascript"></script>
<?php endif; ?>
<?php if (COLORIZE_GAME_TITLE): ?>
    <script src="/js/colorizeGameTitle.js" type="text/javascript"></script>
<?php endif; ?>
</body>
</html>