let dataReceiving = false;
let showBackBtn = false;

// добавить работу с header и footer
// возможно header будет менять размер
$(document).on("click", ".link", function (event) {
    event.preventDefault();
    if (dataReceiving) return false;
    dataReceiving = true;

    $("#content").html("loading");
    $("#container").width($(this).attr("data-width"));
    $("#container").height($(this).attr("data-height"));
    if ($(this).attr("id") === "back") {
        $("#container").removeAttr("style");
        $(this).hide();
        showBackBtn = false;
    } else {
        showBackBtn = true;
    }

    $.get($(this).attr("href"), function (data) {
        setTimeout(() => {
            $("#content").html($(data).find("#content").html());
            if (showBackBtn) $("#back").show();
            dataReceiving = false;
            return false;
        }, 400);
    });
});