<nav>
    <ul id="menu"></ul>
</nav>
<script>
    $.get("/ajax/getPages.php", function (data) {
        if (data) setTimeout(() => createLink(JSON.parse(data), 0), 100);
    });

    function createLink(data, index) {
        let link = `<li class="menuOneList">
                        <a href="/${data[index].fileName}/"
                           class="menuOneBtn green ${data[index].class ?? ""}"
                           data-width="${data[index].width ?? ""}"
                           data-height="${data[index].height ?? ""}">
                                ${data[index].title.toLowerCase()}
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