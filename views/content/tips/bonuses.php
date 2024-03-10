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
                try {
                    data = JSON.parse(data);
                    console.log(data);
                } catch (e) {
                    console.log(data);
                    console.log(e);
                }
            }
        });
    </script>
</div>