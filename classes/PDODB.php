<?php

class PDODB
{

    private string $host = HOST;
    private string $user = USER;
    private string $password = PASSWORD;
    private string $db = DB;
    private string $dsn;
    private array $options;
    public object $pdo;
    private static PDODB $instance;
    /**
     * @throws Exception
     */
    function __construct()
    {
        // в конфиге установить по умолчанию драйвер БД


        $this->dsn = "mysql:host=$this->host;dbname=$this->db";

        $this->options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ];


        try {
            $this->pdo = new PDO($this->dsn , $this->user, $this->password, $this->options);
        }

        catch(PDOException $e) {
            throw new Exception($e);
        }
    }


    /**
     * @return PDODB
     */
    public static function getInstance(): PDODB
    {
        return
            self::$instance === null
                ? self::$instance = new self()
                : self::$instance;
    }
}