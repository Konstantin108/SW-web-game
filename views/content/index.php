<nav>
    <ul id="menu"></ul>
</nav>
<script>
    $.get("/ajax/getPages.php", function (data) {
        data = JSON.parse(data);
        if (data) setTimeout(() => createLink(data, 0), 300);
    });

    function createLink(data, index) {
        let link = `<li>
                        <a href="?page=${data[index].fileName}">${data[index].title}</a>
                    </li>`;

        $("#menu").append(link);

        if (index < data.length - 1) {
            setTimeout(() => {
                return createLink(data, index += 1);
            }, 300);
        }
    }
</script>