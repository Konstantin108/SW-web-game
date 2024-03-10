<?php
include "../includes/main.php";
include "../classes/PagePrepare.php";

$pagePrepare = new PagePrepare();

$excludedPagesArray = [
    "index.php",
    "404.php",
    "..",
    "."
];
$pages = scandir("../views/content/pages/");
$pages = array_diff($pages, $excludedPagesArray);
$result[] = [
    "fileName" => "game",
    "title" => "играть"
];

foreach ($pages as $page) {
    $fileName = pathinfo($page)["filename"];
    $title = $pagePrepare->getPart(file_get_contents($pagePrepare->getPath($fileName)), "title");
    $result[] = [
        "fileName" => $fileName,
        "title" => $title,
        "classes" => [
            "subMenu",
            "link"
        ]
    ];
}
$result[] = [
    "fileName" => "tips/controls",
    "title" => "инструкции",
    "classes" => [
        "subMenu",
        "link"
    ]
];

header("Content-type: application/json; charset=utf-8");
print_r(json_encode($result, JSON_UNESCAPED_UNICODE));