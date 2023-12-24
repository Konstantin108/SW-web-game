<?php

class PagePrepare
{
    public function getIncludeContents($path): bool|string
    {
        if (is_file($path)) {
            ob_start();
            include $path;
            return ob_get_clean();
        }
        return false;
    }

    public function getPath($fileName, $partPath = ""): string
    {
        return "{$partPath}views/content/$fileName.php";
    }

    public function getPart($content, $partName): mixed
    {
        $pattern = "#{{2}$partName:(.*)}{2}#i";
        return preg_match($pattern, $content, $match) && $match[1] ? $match[1] : APP_NAME;
    }

    public function removeAllParts($content): string
    {
        preg_match_all("#{{2}.*}{2}#", $content, $matches);
        foreach (array_shift($matches) as $elem) {
            $content = preg_replace("#$elem#", "", $content);
        }
        return trim($content);
    }
}