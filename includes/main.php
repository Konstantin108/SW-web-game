<?php
include "config.php";

if (DBG) {
    ini_set("display_errors", 1);
    ini_set("display_startup_errors", 1);
    error_reporting(E_ALL);
}

include "classes/DB.php";
include "classes/PagePrepare.php";