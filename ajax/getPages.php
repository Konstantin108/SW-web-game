<?php
include "../includes/main.php";
include "../classes/PagePrepare.php";

$pagePrepare = new PagePrepare();

$excludedPagesArray = [
    "index.php",
    "error.php",
    "..",
    "."
];
$pages = array_diff(scandir("../views/content/pages/"), $excludedPagesArray);
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

print_r(json_encode($result, JSON_UNESCAPED_UNICODE));