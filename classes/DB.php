<?php

// разобраться с датой, которая записывается в рекорд (дата и время)
class DB
{
    private string $host = HOST;
    private string $user = USER;
    private string $password = PASSWORD;
    private string $db = DB;
    private static ?DB $instance = null;
    private mysqli|false $connection;

    // будет jQuery запрос, чтобы передать на фронт картики в папке,
    // их можно будет выбирать при завершении игры
    public function __construct()
    {
        $this->connection = mysqli_connect($this->host, $this->user, $this->password, $this->db) or die(mysqli_error($this->connection));
        mysqli_query($this->connection, "SET NAMES 'utf8'");
    }

    /**
     * @param $query
     * @return array|void
     */
    public function getDataAsArray($query)
    {
        $data = mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));
        return mysqli_fetch_all($data, MYSQLI_ASSOC);
    }

    /**
     * @param $query
     * @return array|false|void|null
     */
    public function getData($query)
    {
        $data = mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));
        return mysqli_fetch_assoc($data);
    }

    /**
     * @return DB|null
     */
    public static function getInstance(): ?DB
    {
        return
            self::$instance === null
                ? self::$instance = new self()
                : self::$instance;
    }
}