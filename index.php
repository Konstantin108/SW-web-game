<?php
// здесь стартовать сессию, JS для получения данных из localStorage
// на длину ника игрока должно быть ограничение
include "includes/main.php";
include "classes/PagePrepare.php";

$pagePrepare = new PagePrepare();
$page = "index";
$directory = null;
$param = null;

preg_match_all("[\w+]", $_SERVER["REQUEST_URI"], $matches);
$matches = array_shift($matches);

if ($matches) {
    if (count($matches) > 1) {
        if (preg_match("/^\d+$/", end($matches))) {
            $param = end($matches);
            array_pop($matches);
        }
    }
    if (count($matches) > 1) {
        $page = $matches[1];
        $directory = $matches[0];
    } else {
        $page = $matches[0];
    }
}

$path = $pagePrepare->getPath($page, $directory);
if (!file_exists($path)) {
    $page = "404";
    $path = $pagePrepare->getPath($page);
    http_response_code(404);
}
$content = $pagePrepare->getIncludeContents($path) ?? "";

$title = $pagePrepare->getPart($content, "title");
$content = $pagePrepare->removeAllParts($content);

include "views/layout.php";