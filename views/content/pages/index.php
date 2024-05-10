<nav>
    <ul id="menu"></ul>
</nav>
<script>
    $.get("/ajax/getPages.php", function (data) {
        try {
            data = JSON.parse(data);
            if (data) setTimeout(() => createLink(data, 0), 100);
        } catch (e) {
            errorMessage("сервис временно недоступен", "получен невалидный JSON")
        }
    });


    function errorMessage(messageForUsers, messageToConsole) {
        let message = `<li class="menuOneList pageElement menuOneBtn quote">
                          <p>${messageForUsers}</p>
                       </li>`;

        setTimeout(() => $("#menu").append(message), 100);
        console.log(messageToConsole);
    }

    function createLink(data, index) {
        let classes = "menuOneBtn";

        if (data[index].classes) data[index].classes.forEach(elem => classes += ` ${elem}`);

        let link = `<li class="menuOneList pageElement">
                        <a href="/${data[index].fileName}/" class="${classes.trim()}">
                            <p>${data[index].title.toLowerCase()}</p>
                        </a>
                    </li>`;

        $("#menu").append(link);

        if (index < data.length - 1) {
            setTimeout(() => {
                return createLink(data, index += 1);
            }, 100);
        }
    }
</script>