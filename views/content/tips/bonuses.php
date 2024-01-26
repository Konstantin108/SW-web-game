{{title: Бонусы}}
{{priority: 3}}

<?php global $param;
include "views/components/tipsMenu.php";
?>
<div id="tipContent">
    <p class="quote">бонусы</p>
    <script>
        $.ajax({
            method: "POST",
            url: "/ajax/getBonuses.php",
            data: {
                page: "<?= $param; ?>"
            },
            success: function (data) {
                console.log(JSON.parse(data));
            }
        });
    </script>
</div>