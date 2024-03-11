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
                    if (!data.hasOwnProperty("fail")) {
                        console.log(data);
                    } else {
                        errorMessage(data.messageForUsers);
                        console.log(data.messageToConsole)
                    }
                } catch (e) {
                    errorMessage("сервис временно недоступен");
                    console.log("получен невалидный JSON");
                }
            }
        });
    </script>
</div>