<?php

use JetBrains\PhpStorm\ArrayShape;

// разобраться с датой, которая записывается в рекорд (дата и время)
class DB
{
    private string $driver;
    private string $host;
    private string $db;
    private string $charset;
    private string $user;
    private string $password;
    private static ?DB $instance = null;
    private object $connection;

    public function __construct()
    {
        $this->driver = DRIVER;
        $this->host = HOST;
        $this->db = DB;
        $this->charset = CHARSET;
        $this->user = USER;
        $this->password = PASSWORD;
    }

    /**
     * @return PDO|void
     */
    private function getConnection()
    {
        if (empty($this->connection)) {
            try {
                $this->connection = new PDO(
                    $this->getSdn(),
                    $this->user,
                    $this->password,
                    $this->getOpt()
                );
            } catch (Exception $e) {
                die("Error! " . $e);
            }
        }
        return $this->connection;
    }

    /**
     * @return string
     */
    private function getSdn(): string
    {
        return sprintf(
            "%s:host=%s;dbname=%s;charset=%s",
            $this->driver,
            $this->host,
            $this->db,
            $this->charset
        );
    }

    /**
     * @return array
     */
    #[ArrayShape([PDO::ATTR_ERRMODE => "int", PDO::ATTR_DEFAULT_FETCH_MODE => "int"])] private function getOpt(): array
    {
        return [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
    }

    /**
     * @param $sql
     * @param array $params
     * @return bool|PDOStatement
     */
    private function query($sql, array $params = []): bool|PDOStatement
    {
        $PDOStatement = $this->getConnection()->prepare($sql);
        $PDOStatement->execute($params);
        return $PDOStatement;
    }

    /**
     * @param $sql
     * @param array $params
     * @return mixed
     */
    public function getData($sql, array $params = []): mixed
    {
        $PDOStatement = $this->query($sql, $params);
        return $PDOStatement->fetch();
    }

    /**
     * @param $sql
     * @param array $params
     * @return bool|array
     */
    public function getDataAsArray($sql, array $params = []): bool|array
    {
        $PDOStatement = $this->query($sql, $params);
        return $PDOStatement->fetchAll();
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