<?php
// здесь стартовать сессию, JS для получения данных из localStorage
// на длину ника игрока должно быть ограничение
include "includes/main.php";
include "classes/PagePrepare.php";
include "exceptions/NotFoundException.php";

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
        [$directory, $page] = $matches;
    } else {
        $page = $matches[0];
    }
}

$path = $pagePrepare->getPath($page, $directory);

try {
    if (!file_exists($path)) throw new NotFoundException($page);
} catch (NotFoundException $e) {
    $e->writeLog();
    $page = "error";
    $path = $pagePrepare->getPath($page);
    $code = 404;
    http_response_code($code);
}

$content = $pagePrepare->getIncludeContents($path) ?? "";

$title = $pagePrepare->getPart($content, "title");
$content = $pagePrepare->removeAllParts($content);

include "views/layout.php";