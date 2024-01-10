let dataReceiving = false;
let needShowBackBtn = false;

$(document).on("click", ".link", function (event) {
    event.preventDefault();
    if (dataReceiving) return false;
    dataReceiving = true;

    $("#content").find(".pageElement").addClass("elementFadeOut");
    setTimeout(() => $("#content").find(".pageElement").hide(), 500);
    $(".navigationArrow").addClass("disabled");
    if ($(this).hasClass("subMenu")) {
        $("#container").toggleClass("smallSize bigSize");
        $("#content").html(
            `<div id="loadingBlock">
                <img src="/src/images/loading.gif" alt="loading" id="loading">
             </div>`
        );
        $("#pageBottom").hide();

        needShowBackBtn = true;
    } else {
        needShowBackBtn = false;
    }

    $.get($(this).attr("href"), function (data) {
        setTimeout(() => {
            $("title").html($(data).filter("title").html());
            $("#content").html($(data).find("#content").html());

            $(".navigationArrow").removeClass("disabled");
            if (needShowBackBtn) {
                $("#pageBottom").show();
                $("#back").toggleClass("hideElement showElement");
            }

            dataReceiving = false;
            return false;
        }, 400);
    });
});