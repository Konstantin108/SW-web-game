<?php global $title, $content, $page;
$containerSizeClass = "bigSize";
$backBtnDisplayClass = "showElement";

if ($page === "index" || $page === "404") {
    $containerSizeClass = "smallSize";
    $backBtnDisplayClass = "hideElement";
}
?>
<!doctype html>
<html lang="en">
<head>
    <?php include "views/components/head.php"; ?>
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
        <div id="container" class="<?= $containerSizeClass; ?>">
            <div id="content">
                <?= $content; ?>
            </div>
            <div id="pageBottom" class="pageElement">
                <a href="/" id="back" class="subMenu link <?= $backBtnDisplayClass; ?>">
                    <p>назад</p>
                </a>
            </div>
        </div>
    </main>
    <footer>
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