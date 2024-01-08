{{title: Таблица лидеров}}

<?php global $param; ?>
<div id="recordsPage">
    <p class="pageTitle">таблица лидеров</p>
    <div id="pageContentContainer" class="flexBox">
        <div id="recordsTableContainer"></div>
        <div id="navigationBlockContainer"></div>
    </div>
</div>
<script>
    $.ajax({
        method: "POST",
        url: "/ajax/getRecords.php",
        data: {
            rpage: "<?= $param; ?>"
        },
        success: function (data) {
            checkRecordsCount(JSON.parse(data));
        }
    });


    function checkRecordsCount(data) {
        data.items.length ? createRecordsTable(data) : noRecordsMessageShow();
    }

    function noRecordsMessageShow() {
        let message = `<div id="noRecordsMessageBlock" class="pageElement">
                          <p>таблица лидеров пуста</p>
                          <p>стань первым</p>
                       </div>`;

        $("#pageContentContainer").append(message);
    }

    function createRecordsTable(data) {
        let table = `<table>
                        <thead>
                            <tr>
                                <td id="playerColumn">
                                    <div id="theadDiv">
                                        <p class="tableText">игрок</p>
                                    </div>
                                </td>
                                <td id="levelColumn">
                                    <div>
                                        <p class="tableText">уровень достигнут</p>
                                    </div>
                                </td>
                                <td id="shipDestroyedColumn">
                                    <div>
                                        <p class="tableText">противников уничтожено</p>
                                    </div>
                                </td>
                                <td id="bossDestroyedColumn">
                                    <div>
                                        <p class="tableText">босс уничтожен</p>
                                    </div>
                                </td>
                                <td id="scoreColumn">
                                    <div>
                                        <p class="tableText">очки</p>
                                    </div>
                                </td>
                                <td id="createdAtColumn">
                                    <div>
                                        <p class="tableText">дата/время</p>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                        <tbody id="recordsTable"></tbody>
                     </table>`;

        $("#recordsTableContainer").append(table);
        setTimeout(() => createRecordRow(data.items, 0), 100);
        createNavigationArrows(data);
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

        let record = `<tr class="pageElement">
                        <td>
                            <div id="tbodyDiv">
                                <img src="/src/images/${items[index].avatar}" alt="${items[index].avatar}" id="avatar">
                                <p id="playerName" class="tableText">${items[index].name}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p class="tableText">${Number(items[index].level).toLocaleString()}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p class="tableText">${Number(items[index].ship_destroyed).toLocaleString()}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p class="tableText">${Number(items[index].boss_destroyed).toLocaleString()}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p class="tableText">${Number(items[index].score).toLocaleString()}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p class="tableText">${date.replace(",", "")}</p>
                            </div>
                        </td>
                      </tr>`;

        $("#recordsTable").append(record);

        if (index < items.length - 1) {
            setTimeout(() => {
                return createRecordRow(items, index += 1);
            }, 100);
        }
    }

    function createNavigationArrows(data) {
        let page = data.page;
        let max = data.max;
        let path = data.path;
        let prevArrowDisabled = "";
        let nextArrowDisabled = "";

        if (page <= 1) prevArrowDisabled = "disabled";
        if (page >= max) nextArrowDisabled = "disabled";

        let navigationBLock = `<div id="navigationBlock">
                                  <a href="${path + (page - 1)}"
                                     class="link navigationArrow ${prevArrowDisabled}">
                                        <i class="fas fa-arrow-up"></i>
                                  </a>
                                  <a href="${path + (page + 1)}"
                                     class="link navigationArrow ${nextArrowDisabled}">
                                        <i class="fas fa-arrow-down"></i>
                                  </a>
                               </div>`;

        $("#navigationBlockContainer").append(navigationBLock);
    }
</script>