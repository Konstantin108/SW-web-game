<?php
include "../config.php";
include "../classes/DB.php";
include "../repositories/Repository.php";
include "../repositories/RecordRepository.php";
include "../classes/Pagination.php";

$recordRepository = new RecordRepository;
$paramName = "rpage";
$slug = "records/";
$recordsOnPage = 5;
$recordsPageNumber = 1;

$pagination = new Pagination($recordRepository, $paramName, $slug, $recordsOnPage, $recordsPageNumber);
print_r(json_encode($pagination->getPage(), JSON_UNESCAPED_UNICODE));