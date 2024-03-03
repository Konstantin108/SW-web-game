<?php
include dirname(__DIR__) . "/config.php";

if (DBG) {
    ini_set("display_errors", 1);
    ini_set("display_startup_errors", 1);
    error_reporting(E_ALL);
}