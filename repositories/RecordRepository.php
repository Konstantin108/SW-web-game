<?php

class RecordRepository extends Repository
{
    /**
     * @return string
     */
    protected function getTableName(): string
    {
        return "records";
    }

    /**
     * @return string
     */
    protected function getOrderByColumn(): string
    {
        return "score";
    }

    /**
     * @return string
     */
    protected function getSortingMode(): string
    {
        return "DESC";
    }
}