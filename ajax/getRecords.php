<?php
include "../config.php";
include "../classes/DB.php";

// ограничить - нельзя перейти на страницу, больше максимальной
// разобраться с total, возможно использовать отдельный метод для получения total
$recordsOnPage = 5;
$recordsPageNumber = 1;

if (preg_match("/^\d+$/", $_POST["rpage"])) $recordsPageNumber = (int)$_POST["rpage"];

$from = ($recordsPageNumber - 1) * $recordsOnPage;

$query = "SELECT * FROM records ORDER BY score DESC LIMIT $from, $recordsOnPage";
$result = (new DB)->readData($query);
print_r(json_encode($result));