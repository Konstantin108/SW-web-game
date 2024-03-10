<?php
include "../includes/main.php";
include "../classes/DB.php";
include "../repositories/Repository.php";
include "../repositories/BonusRepository.php";
include "../classes/Pagination.php";
include "../exceptions/DbException.php";

$bonusRepository = new BonusRepository();
$slug = "tips/bonuses/";
$bonusesOnPage = 5;
$bonusesPageNumber = 1;

$pagination = new Pagination($bonusRepository, $slug, $bonusesOnPage, $bonusesPageNumber);

try {
    print_r(json_encode($pagination->getPage(), JSON_UNESCAPED_UNICODE));
} catch (DbException $e) {
    $e->writeLog();
    print_r(json_encode($e->getMessageForUsers(), JSON_UNESCAPED_UNICODE));
}