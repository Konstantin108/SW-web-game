<?php
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
    private PDO $connection;

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
     * @return PDO
     * @throws DbException
     */
    private function getConnection(): PDO
    {
        if (empty($this->connection)) {
            try {
                $this->connection = new PDO(
                    $this->getSdn(),
                    $this->user,
                    $this->password,
                    $this->getOptions()
                );
            } catch (PDOException $e) {
                throw new DbException($e->getMessage());
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
    #[ArrayShape([PDO::ATTR_ERRMODE => "int", PDO::ATTR_DEFAULT_FETCH_MODE => "int"])] private function getOptions(): array
    {
        return [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
    }

    /**
     * @param string $sql
     * @param array $params
     * @return bool|PDOStatement|null
     * @throws DbException
     */
    private function exec(string $sql, array $params = []): bool|PDOStatement|null
    {
        $PDOStatement = $this->getConnection()->prepare($sql);
        return $PDOStatement->execute($params)
            ? $PDOStatement
            : null;
    }

    /**
     * @param string $sql
     * @return mixed|null
     * @throws DbException
     */
    public function getRowsCount(string $sql): mixed
    {
        $PDOStatement = $this->exec($sql);
        return $PDOStatement
            ? $PDOStatement->fetchColumn()
            : null;
    }

    /**
     * @param string $sql
     * @param array $params
     * @return bool|array|null
     * @throws DbException
     */
    public function query(string $sql, array $params = []): bool|array|null
    {
        $PDOStatement = $this->exec($sql, $params);
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