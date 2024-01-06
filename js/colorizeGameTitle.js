if ($(".letter").length) {
    setInterval(() => {
        let index = Math.floor(Math.random() * $(".letter").length);
        let letter = $(".letter")[index];

        $(letter).toggleClass("yellowLetter orangeLetter");
    }, 10000);
}