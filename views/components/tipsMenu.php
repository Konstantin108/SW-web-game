<?php global $pagePrepare, $page;
$excludedTipsArray = [
    "..",
    "."
];
$tips = scandir(dirname(__DIR__) . "/content/tips");
$tips = array_diff($tips, $excludedTipsArray);
$result = [];

foreach ($tips as $tip) {
    $fileName = pathinfo($tip)["filename"];
    $title = $pagePrepare->getPart(file_get_contents($pagePrepare->getPath($fileName, "tips")), "title");
    $priority = $pagePrepare->getPart(file_get_contents($pagePrepare->getPath($fileName, "tips")), "priority");
    $id = explode(".", $tip)[0];
    $page === $id ? $class = "selected" : $class = "";
    $result[] = [
        "fileName" => $fileName,
        "title" => $title,
        "priority" => $priority,
        "id" => $id,
        "class" => $class
    ];
}

usort($result, function ($a, $b) {
    return ($a["priority"] - $b["priority"]);
});
?>
<nav>
    <ul id="tipsMenu">
        <?php foreach ($result as $elem): ?>
            <li class="menuOneList">
                <a href="/tips/<?= $elem["fileName"]; ?>/"
                   id="<?= $elem["id"]; ?>"
                   class="tipMenuOneBtn link navigationElement <?= $elem["class"]; ?>">
                    <p><?= $elem["title"]; ?></p>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</nav>