<?php
include "AbstractException.php";

class DbException extends AbstractException
{
    protected string $errorMessage;
    protected string $messageForUsers;

    /**
     * @param string $errorMessage
     */
    public function __construct(string $errorMessage)
    {
        Exception::__construct("Проблема с БД $errorMessage");
        parent::__construct("../");
        $this->errorMessage = $errorMessage;
        $this->messageForUsers = "cервис временно недоступен";
    }

    /**
     * @return string
     */
    public function getMessageForUsers(): string
    {
        return $this->messageForUsers;
    }
}