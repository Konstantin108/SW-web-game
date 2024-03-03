<?php

class PagePrepare
{
    /**
     * @param string $path
     * @return bool|string
     */
    public function getIncludeContents(string $path): bool|string
    {
        ob_start();
        include $path;
        $buffer = ob_get_contents();
        ob_end_clean();
        return $buffer;
    }

    /**
     * @param string $fileName
     * @param string|null $directory
     * @return string
     */
    public function getPath(string $fileName, ?string $directory = "pages"): string
    {
        $directory = $directory ?: "pages";
        return dirname(__DIR__) . "/views/content/$directory/$fileName.php";
    }

    /**
     * @param string $content
     * @param string $partName
     * @return bool|string
     */
    public function getPart(string $content, string $partName): bool|string
    {
        $pattern = "#{{2}$partName:(.*)}{2}#i";
        if (preg_match($pattern, $content, $match) && $match[1]) {
            return trim($match[1]);
        }
        return false;
    }

    /**
     * @param string $content
     * @return string
     */
    public function removeAllParts(string $content): string
    {
        preg_match_all("#{{2}.*}{2}#", $content, $matches);
        foreach (array_shift($matches) as $elem) {
            $content = preg_replace("#$elem#", "", $content);
        }
        return trim($content);
    }
}