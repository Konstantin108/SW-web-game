<?php

class PagePrepare
{
    /**
     * @param $path
     * @return bool|string
     */
    public function getIncludeContents($path): bool|string
    {
        if (is_file($path)) {
            ob_start();
            include $path;
            return ob_get_clean();
        }
        return false;
    }

    /**
     * @param $fileName
     * @param string $slug
     * @return string
     */
    public function getPath($fileName, string $slug = ""): string
    {
        return "{$slug}views/content/$fileName.php";
    }

    /**
     * @param $content
     * @param $partName
     * @return string
     */
    public function getPart($content, $partName): string
    {
        $pattern = "#{{2}$partName:(.*)}{2}#i";
        if (preg_match($pattern, $content, $match) && $match[1]) {
            return trim($match[1]);
        }
        return false;
    }

    /**
     * @param $content
     * @return string
     */
    public function removeAllParts($content): string
    {
        preg_match_all("#{{2}.*}{2}#", $content, $matches);
        foreach (array_shift($matches) as $elem) {
            $content = preg_replace("#$elem#", "", $content);
        }
        return trim($content);
    }
}