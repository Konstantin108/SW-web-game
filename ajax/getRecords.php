<?php
include "../config.php";
include "../classes/DB.php";
// не может быть записан уровень выше возможного уровня в игре
// запретить ввод опасных и спец символов
// добавить LIMIT
// будет пагинация
$query = "SELECT * FROM records ORDER BY score DESC";
$result = (new DB)->readData($query);
print_r(json_encode($result));