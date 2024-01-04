<?php
include "../config.php";
include "../classes/DB.php";

$db = new DB;

$recordsOnPage = 5;
$recordsPageNumber = 1;

$query = "SELECT COUNT(*) AS count FROM records";
$recordsTotal = $db->getData($query)["count"];
$recordsPagesCount = ceil($recordsTotal / $recordsOnPage);

if (preg_match("/^\d+$/", $_POST["rpage"])) {
    $number = (int)$_POST["rpage"];
    if ($number && $number <= $recordsPagesCount) $recordsPageNumber = $number;
    if ($number > $recordsPagesCount) $recordsPageNumber = $recordsPagesCount;
}

$from = ($recordsPageNumber - 1) * $recordsOnPage;

$query = "SELECT * FROM records ORDER BY score DESC LIMIT $from, $recordsOnPage";
$result["items"] = $db->getDataAsArray($query);
$result["page"] = $recordsPageNumber;
$result["max"] = $recordsPagesCount;
$result["path"] = AJAX_TRANSITION ? "records/" : "";

print_r(json_encode($result, JSON_UNESCAPED_UNICODE));