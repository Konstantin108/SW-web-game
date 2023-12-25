<?php
include "config.php";

if (DBG) {
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    ini_set("display_startup_errors", 1);
}

include "classes/DB.php";
include "classes/PagePrepare.php";