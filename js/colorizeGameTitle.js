if ($(".letter").length) {
    setInterval(() => {
        let index = Math.floor(Math.random() * $(".letter").length);
        let letter = $(".letter")[index];
        if ($(letter).hasClass("orangeLetter")) {
            $(letter).toggleClass("yellowLetter orangeLetter");
        } else {
            $(letter).toggleClass("orangeLetter yellowLetter");
        }
    }, 10000);
}