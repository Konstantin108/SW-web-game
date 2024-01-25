<?php

class PagePrepare
{
    /**
     * @param $path
     * @return false|string
     */
    public function getIncludeContents($path): bool|string
    {
        ob_start();
        include $path;
        return ob_get_clean();
    }

    /**
     * @param $fileName
     * @param string|null $directory
     * @return string
     */
    public function getPath($fileName, ?string $directory = "pages"): string
    {
        $directory = $directory ?: "pages";
        return dirname(__DIR__) . "/views/content/$directory/$fileName.php";
    }

    /**
     * @param $content
     * @param $partName
     * @return false|string
     */
    public function getPart($content, $partName): bool|string
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