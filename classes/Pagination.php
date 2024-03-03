<?php

use JetBrains\PhpStorm\ArrayShape;

class Pagination
{
    private object $repository;
    private string $slug;
    private int $elemOnPageCount;
    private int $currentPage;
    private string $paramName;
    private int $pagesCount;

    /**
     * @param Repository $repository
     * @param string $slug
     * @param int $elemOnPageCount
     * @param int $currentPage
     */
    public function __construct(Repository $repository, string $slug, int $elemOnPageCount, int $currentPage)
    {
        $this->repository = $repository;
        $this->slug = $slug;
        $this->elemOnPageCount = $elemOnPageCount;
        $this->currentPage = $currentPage;
        $this->paramName = "page";
    }

    /**
     * @return mixed
     */
    public function getTotal(): mixed
    {
        return $this->repository->getCount();
    }

    /**
     * @return float
     */
    public function getPagesCount(): float
    {
        return $this->pagesCount = ceil($this->getTotal() / $this->elemOnPageCount);
    }

    /**
     * @return int
     */
    public function getPageNumber(): int
    {
        $this->getPagesCount();
        if (isset($_POST[$this->paramName]) && preg_match("/^\d+$/", $_POST[$this->paramName])) {
            $number = (int)$_POST[$this->paramName];
            if ($number && $number <= $this->pagesCount) $this->currentPage = $number;
            if ($number > $this->pagesCount) $this->currentPage = $this->pagesCount;
        }
        return $this->currentPage;
    }

    /**
     * @return float|int
     */
    public function getElemFromNumber(): float|int
    {
        return ($this->getPageNumber() - 1) * $this->elemOnPageCount;
    }

    /**
     * @return array|void
     */
    public function getElemsOnCurrentPage()
    {
        return $this->repository->getAllRows($this->getElemFromNumber(), $this->elemOnPageCount);
    }

    /**
     * @return array
     */
    #[ArrayShape(["items" => "array|void", "page" => "int", "max" => "int", "path" => "string"])] public function getPage(): array
    {
        return [
            "items" => $this->getElemsOnCurrentPage(),
            "page" => $this->currentPage,
            "max" => $this->pagesCount,
            "path" => AJAX_TRANSITION ? $this->slug : ""
        ];
    }
}