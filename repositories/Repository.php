<?php

abstract class Repository
{
    /**
     * @return string
     */
    abstract protected function getTableName(): string;

    /**
     * @return string
     */
    abstract protected function getOrderByColumn(): string;

    /**
     * @return string
     */
    abstract protected function getSortingMode(): string;

    /**
     * @return DB|null
     */
    protected function getDB(): ?DB
    {
        return DB::getInstance();
    }

    /**
     * @return mixed
     */
    public function getCount(): mixed
    {
        $tableName = $this->getTableName();
        $query = "SELECT COUNT(*) AS count FROM $tableName";
        return $this->getDB()->getData($query)["count"];
    }

    /**
     * @param $from
     * @param $elemsOnPage
     * @return array|void
     */
    public function getAllRows($from, $elemsOnPage)
    {
        $tableName = $this->getTableName();
        $orderByColumn = $this->getOrderByColumn();
        $sortingMode = $this->getSortingMode();
        $query = "SELECT * FROM $tableName ORDER BY $orderByColumn $sortingMode LIMIT $from, $elemsOnPage";
        return $this->getDB()->getDataAsArray($query);
    }
}