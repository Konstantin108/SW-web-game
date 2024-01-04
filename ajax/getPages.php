<?php
include "../config.php";
include "../classes/PagePrepare.php";

$pagePrepare = new PagePrepare;

$excludedPagesArray = [
    "index.php",
    "404.php",
    "..",
    "."
];
$pages = scandir("../views/content/");
$pages = array_diff($pages, $excludedPagesArray);
$result[] = [
    "fileName" => "game",
    "title" => "играть"
];

foreach ($pages as $page) {
    $fileName = pathinfo($page)["filename"];
    $title = $pagePrepare->getPart(file_get_contents($pagePrepare->getPath($fileName, "../")), "title");
    $width = $pagePrepare->getPart(file_get_contents($pagePrepare->getPath($fileName, "../")), "width");
    $height = $pagePrepare->getPart(file_get_contents($pagePrepare->getPath($fileName, "../")), "height");
    $result[] = [
        "fileName" => $fileName,
        "title" => $title,
        "width" => $width,
        "height" => $height,
        "class" => "link"
    ];
}

print_r(json_encode($result, JSON_UNESCAPED_UNICODE));