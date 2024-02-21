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
        $sql = "SELECT COUNT(*) AS count FROM {$this->getTableName()}";
        return $this->getDB()->getData($sql)["count"];
    }

    /**
     * @param $from
     * @param $elemsOnPage
     * @return bool|array
     */
    public function getAllRows($from, $elemsOnPage): bool|array
    {
        $sql = sprintf(
            "SELECT * FROM %s ORDER BY %s %s LIMIT %d, %d",
            $this->getTableName(),
            $this->getOrderByColumn(),
            $this->getSortingMode(),
            $from,
            $elemsOnPage
        );
        return $this->getDB()->getDataAsArray($sql);
    }
}