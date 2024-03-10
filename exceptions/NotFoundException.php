<?php
include "AbstractException.php";

class NotFoundException extends AbstractException
{
    protected string $notFoundedPageName;

    /**
     * @param string $notFoundedPageName
     */
    public function __construct(string $notFoundedPageName)
    {
        Exception::__construct("Страница { $notFoundedPageName } - не найдена!");
        parent::__construct();
        $this->notFoundedPageName = $notFoundedPageName;
    }
}