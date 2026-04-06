function toggleDropdown(event, id) {
    event.stopPropagation();
    const dropdowns = document.querySelectorAll(".dropdown");
    const target = document.getElementById(id);

    dropdowns.forEach((d) => {
        if (d !== target) d.style.display = "none";
    });

    target.style.display = target.style.display === "block" ? "none" : "block";
}

window.onclick = function () {
    document
        .querySelectorAll(".dropdown")
        .forEach((d) => (d.style.display = "none"));
};
