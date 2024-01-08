<?php
// здесь стартовать сессию, JS для получения данных из localStorage
// на длину ника игрока должно быть ограничение
include "includes/main.php";

$db = new DB;
$pagePrepare = new PagePrepare;

preg_match_all("[\w+]", $_SERVER["REQUEST_URI"], $matches);
$matches = array_shift($matches);
$page = $matches[0] ?? "index";
$param = $matches[1] ?? null;

$path = $pagePrepare->getPath($page);
if (!file_exists($path)) {
    $page = "404";
    $path = $pagePrepare->getPath($page);
    header("HTTP/1.0 404 Not Found");
}
$content = $pagePrepare->getIncludeContents($path) ?? "";

$title = $pagePrepare->getPart($content, "title");
$content = $pagePrepare->removeAllParts($content);

include "views/layout.php";