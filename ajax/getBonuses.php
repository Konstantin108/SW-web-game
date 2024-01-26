<?php
include "../config.php";
include "../classes/DB.php";
include "../repositories/Repository.php";
include "../repositories/BonusRepository.php";
include "../classes/Pagination.php";

$bonusRepository = new BonusRepository;
$slug = "tips/bonuses/";
$bonusesOnPage = 5;
$bonusesPageNumber = 1;

$pagination = new Pagination($bonusRepository, $slug, $bonusesOnPage, $bonusesPageNumber);
print_r(json_encode($pagination->getPage(), JSON_UNESCAPED_UNICODE));