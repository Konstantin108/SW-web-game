let dataReceiving = false;
let needShowBackBtn = false;
let tipMenuOneBtnId = "controls";

$(document).on("click", ".link", function (event) {
    event.preventDefault();
    if (dataReceiving) return false;
    dataReceiving = true;

    $("#content").find(".pageElement").addClass("elementFadeOut");
    setTimeout(() => $("#content").find(".pageElement").hide(), 500);
    $(".navigationElement").addClass("disabled");
    if ($(this).hasClass("subMenu")) {
        $("#container").toggleClass("smallSize bigSize");
        showLoadingBlock("content");
        $("#pageBottom").hide();

        needShowBackBtn = true;
    } else {
        needShowBackBtn = false;
    }

    if ($(this).hasClass("tipMenuOneBtn")) {
        showLoadingBlock("tipContent");
        tipMenuOneBtnId = $(this).prop("id");
    } else {
        tipMenuOneBtnId = "controls";
    }

    $.get($(this).attr("href"), function (data) {
        setTimeout(() => {
            $("title").html($(data).filter("title").html());
            $("#content").html($(data).find("#content").html());

            $(".navigationElement").removeClass("disabled");
            if (needShowBackBtn) {
                $("#pageBottom").show();
                $("#back").toggleClass("hideElement showElement");
            }

            $(`#${tipMenuOneBtnId}`).addClass("selected");

            dataReceiving = false;
            return false;
        }, 400);
    });
});


function showLoadingBlock(selector) {
    $(`#${selector}`).html(
        `<div id="loadingBlock">
            <img src="/src/images/loading.gif" alt="loading" id="loading">
         </div>`
    );
}