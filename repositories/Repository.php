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
     * @return DB
     */
    protected function getDB(): DB
    {
        return DB::call();
    }

    /**
     * @return mixed|null
     */
    public function getCount(): mixed
    {
        $sql = "SELECT COUNT(*) FROM `{$this->getTableName()}`;";
        return $this->getDB()->getRowsCount($sql);
    }

    /**
     * @param int $from
     * @param int $elemsOnPage
     * @return bool|array|null
     */
    public function getAllRows(int $from, int $elemsOnPage): bool|array|null
    {
        $sql = sprintf(
            "SELECT * FROM `%s` ORDER BY `%s` %s LIMIT %d, %d;",
            $this->getTableName(),
            $this->getOrderByColumn(),
            $this->getSortingMode(),
            $from,
            $elemsOnPage
        );
        return $this->getDB()->query($sql);
    }
}