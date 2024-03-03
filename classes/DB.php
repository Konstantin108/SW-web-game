<?php
// добавить spl_autoload_register и избавиться от include
include __DIR__ . "/../traits/SingletonTrait.php";

use JetBrains\PhpStorm\ArrayShape;

// разобраться с датой, которая записывается в рекорд (дата и время)
class DB
{
    use SingletonTrait;

    private string $driver;
    private string $host;
    private string $db;
    private string $charset;
    private string $user;
    private string $password;
    private object $connection;

    private function __construct()
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
            } catch (Exception $error) {
                die($error);
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
     * @param string $sql
     * @param array $params
     * @return bool|PDOStatement
     */
    private function query(string $sql, array $params = []): bool|PDOStatement
    {
        $PDOStatement = $this->getConnection()->prepare($sql);
        $PDOStatement->execute($params);
        return $PDOStatement;
    }

    /**
     * @param string $sql
     * @param array $params
     * @return mixed|null
     */
    public function getData(string $sql, array $params = []): mixed
    {
        $PDOStatement = $this->query($sql, $params);
        return $PDOStatement
            ? $PDOStatement->fetch()
            : null;
    }

    /**
     * @param string $sql
     * @param array $params
     * @return bool|array|null
     */
    public function getDataAsArray(string $sql, array $params = []): bool|array|null
    {
        $PDOStatement = $this->query($sql, $params);
        return $PDOStatement
            ? $PDOStatement->fetchAll()
            : null;
    }

    /**
     * @return DB
     */
    public static function call(): DB
    {
        return static::getInstance();
    }
}