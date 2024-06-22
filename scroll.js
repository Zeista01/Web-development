
document.addEventListener("DOMContentLoaded", function () {
    var dropdownMenu = document.getElementById("dropdownMenu");

    window.addEventListener("scroll", function () {
        var scrollPosition = window.scrollY + window.innerHeight;
        var threshold = document.body.offsetHeight;

        if (scrollPosition >= threshold) {
            dropdownMenu.classList.add("show");
        } else {
            dropdownMenu.classList.remove("show");
        }
    });
});
