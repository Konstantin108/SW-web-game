<?php

class DB
{
    private mysqli|false $connection;

    // будет jQuery запрос, чтобы передать на фронт картики в папке,
    // их можно будет выбирать при завершении игры
    public function __construct()
    {
        $host = HOST;
        $user = USER;
        $password = PASSWORD;
        $db = DB;

        $this->connection = mysqli_connect($host, $user, $password, $db) or die(mysqli_error($this->connection));
        mysqli_query($this->connection, "SET NAMES 'utf8'");
    }

    /**
     * @param $query
     * @return array|void
     */
    public function readData($query)
    {
        $data = mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));
        $result["items"] = mysqli_fetch_all($data, MYSQLI_ASSOC);
        $result["total"] = mysqli_num_rows($data);
        return $result;
    }
}