let dataReceiving = false;

// добавить работу с header и footer
// возможно header будет менять размер
// кнопка назад в footer должна быть отображена при переходе в подменю
// в ссылки добавить attr-height и attr-width для получения нужного размера табло для каждого
// пункта подменю
$(document).on("click", "a", function (event) {
    if ($(this).attr("href") === "/game/") return;
    if (dataReceiving) return false;
    dataReceiving = true;
    event.preventDefault();
    $("#content").html("loading");
    $.get($(this).attr("href"), function (data) {
        $("main").addClass("bigSize");
        setTimeout(() => {
            $("#content").html($(data).find("#content").html());
            dataReceiving = false;
            return false;
        }, 500);
    });
});