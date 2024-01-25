<?php

class BonusRepository extends Repository
{
    /**
     * @return string
     */
    protected function getTableName(): string
    {
        return "bonuses";
    }

    /**
     * @return string
     */
    protected function getOrderByColumn(): string
    {
        return "priority";
    }

    /**
     * @return string
     */
    protected function getSortingMode(): string
    {
        return "ASC";
    }
}