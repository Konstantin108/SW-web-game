<?php

trait SingletonTrait
{
    private static self $item;

    /**
     * @return static
     */
    public static function getInstance(): static
    {
        return empty(static::$item)
            ? static::$item = new static()
            : static::$item;
    }

    protected function __construct()
    {
    }

    protected function __clone()
    {
    }

    public function __wakeup()
    {
    }
}