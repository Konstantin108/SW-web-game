{{title: Таблица лидеров}}

<?php global $param; ?>
<b>лучшие игроки</b>
<div id="recordsTableContainer"></div>
<script>
    $.ajax({
        method: "POST",
        url: "/ajax/getRecords.php",
        data: {
            rpage: "<?= $param; ?>"
        },
        success: function (data) {
            checkRecordsCount(JSON.parse(data));
        },
    });

    function checkRecordsCount(data) {
        data.total ? createRecordsTable(data) : noRecordsMessageShow();
    }

    function noRecordsMessageShow() {
        let message = `<div class="elementFadeIn">
                          <p>таблица лидеров пуста</p>
                          <p>стань первым</p>
                       </div>`;

        setTimeout(() => $("#recordsTableContainer").append(message), 100);
    }

    function createRecordRow(items, index) {
        let date = new Date(items[index].created_at);
        date = date.toLocaleDateString("ru", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

        let path = `src/images/${items[index].avatar}`;

        let record = `<tr>
                        <td>
                            <img src="/${path}" alt="${items[index].avatar}" class="avatar">
                        </td>
                        <td>${items[index].name}</td>
                        <td>${items[index].level}</td>
                        <td>${items[index].ship_destroyed}</td>
                        <td>${items[index].boss_destroyed}</td>
                        <td>${items[index].score}</td>
                        <td>${date.replace(",", "")}</td>
                      </tr>`;

        $("#recordsTable").append(record);

        if (index < items.length - 1) {
            setTimeout(() => {
                return createRecordRow(items, index += 1);
            }, 100);
        }
    }

    function createRecordsTable(data) {
        let table = `<table>
                        <thead>
                            <tr>
                                <td colspan="2">игрок</td>
                                <td>уровень достигнут</td>
                                <td>противников уничтожено</td>
                                <td>босс уничтожен</td>
                                <td>очки</td>
                                <td>дата/время</td>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td colspan="7">Всего записей ${data.total}</td>
                            </tr>
                        </tfoot>
                        <tbody id="recordsTable"></tbody>
                     </table>`;

        $("#recordsTableContainer").append(table);
        setTimeout(() => createRecordRow(data.items, 0), 100);
    }
</script>