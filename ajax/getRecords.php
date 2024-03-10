<?php
include "../includes/main.php";
include "../classes/DB.php";
include "../repositories/Repository.php";
include "../repositories/RecordRepository.php";
include "../classes/Pagination.php";
include "../exceptions/DbException.php";

$recordRepository = new RecordRepository();
$slug = "records/";
$recordsOnPage = 5;
$recordsPageNumber = 1;

$pagination = new Pagination($recordRepository, $slug, $recordsOnPage, $recordsPageNumber);

try {
    print_r(json_encode($pagination->getPage(), JSON_UNESCAPED_UNICODE));
} catch (DbException $e) {
    $e->writeLog();
    print_r(json_encode($e->getMessageForUsers(), JSON_UNESCAPED_UNICODE));
}