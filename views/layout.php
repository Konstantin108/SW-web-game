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
    <script src="https://kit.fontawesome.com/4bd251a57a.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
            integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <title><?= $title ?: APP_NAME ?></title>
</head>
<body>
<div id="wrapper">
    <div id="top">
        <header>
            <?php include "views/components/header.php"; ?>
        </header>
    </div>
    <main>
        <div id="container">
            <div id="content">
                <?= $content; ?>
            </div>
            <a href="/" id="back" class="link">
                назад
            </a>
        </div>
    </main>
    <footer>
        <!--    возможно при переходе в подменю просто добавлять класс и не передавать ширину и высоту для каждой страницы-->
        <?php include "views/components/footer.php"; ?>
    </footer>
</div>
<?php if (AJAX_TRANSITION): ?>
    <script src="/js/getRequest.js" type="text/javascript"></script>
<?php endif; ?>
<?php if (COLORIZE_GAME_TITLE): ?>
    <script src="/js/colorizeGameTitle.js" type="text/javascript"></script>
<?php endif; ?>
</body>
</html>