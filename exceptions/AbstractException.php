<?php

abstract class AbstractException extends Exception
{
    protected string $writelog;
    protected string $logFile;

    /**
     * @param string $slug
     */
    public function __construct(string $slug = "")
    {
        parent::__construct();
        $this->writelog = WRITE_LOG;
        $this->logFile = $slug . LOG_FILE;
    }

    /**
     * @return void
     */
    public function writeLog(): void
    {
        if ($this->writelog) {
            $text = PHP_EOL
                . ">>>>>> "
                . date("Y-m-d H:i:s")
                . " ----------------------------------------"
                . PHP_EOL
                . $this->__toString()
                . PHP_EOL;
            error_log($text, 3, $this->logFile);
        }
    }
}