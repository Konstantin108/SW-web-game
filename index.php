<?php
include "config.php";
include "classes/DB.php";
include "classes/PagePrepare.php";

// здесь стартовать сессию, JS для получения данных из localStorage
if (DBG) {
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    ini_set("display_startup_errors", 1);
}

$db = new DB;
$pagePrepare = new PagePrepare;

$path = $pagePrepare->getPath("index");
$content = "";

if (!empty($_GET["page"])) $path = $pagePrepare->getPath($_GET["page"]);
if (!file_exists($path)) {
    $path = $pagePrepare->getPath("404");
    header("HTTP/1.0 404 Not Found");
}
$content = $pagePrepare->getIncludeContents($path);

$title = $pagePrepare->getPart($content, "title");
$content = $pagePrepare->removeAllParts($content);

include "views/layout.php";