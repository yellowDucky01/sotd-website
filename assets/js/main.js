function toggleDropdown(e, id) {
    e.preventDefault();

    const dropdowns = document.querySelectorAll(
        ".menu-dropdown, .information-dropdown, .donations-dropdown",
    );
    dropdowns.forEach((dd) => {
        if (dd.id !== id) {
            dd.classList.remove("show");
        }
    });

    document.getElementById(id).classList.toggle("show");
}

window.onclick = function(e) {
    if (!e.target.matches(".menu-link")) {
        const dropdowns = document.querySelectorAll(
            ".menu-dropdown, .information-dropdown, .donations-dropdown",
        );
        dropdowns.forEach((dd) => dd.classList.remove("show"));
    }
};
