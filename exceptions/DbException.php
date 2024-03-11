<?php
include "AbstractException.php";

class DbException extends AbstractException
{
    protected string $errorMessage;
    protected string $messageForUsers;
    protected string $messageToConsole;

    /**
     * @param string $errorMessage
     */
    public function __construct(string $errorMessage)
    {
        Exception::__construct("Проблема с БД $errorMessage");
        parent::__construct("../");
        $this->errorMessage = $errorMessage;
        $this->messageForUsers = "сервис временно недоступен";
        $this->messageToConsole = "проблема с подключением к БД";
    }

    /**
     * @return string
     */
    public function getMessageForUsers(): string
    {
        return $this->messageForUsers;
    }

    /**
     * @return string
     */
    public function getMessageToConsole(): string
    {
        return $this->messageToConsole;
    }
}