function toggleDropdown(e, id) {
    e.preventDefault();

    // Close all other dropdowns
    const dropdowns = document.querySelectorAll(
        ".menu-dropdown, .information-dropdown",
    );
    dropdowns.forEach((dd) => {
        if (dd.id !== id) {
            dd.classList.remove("show");
        }
    });

    // Toggle the clicked dropdown
    document.getElementById(id).classList.toggle("show");
}

// Close dropdowns when clicking outside
window.onclick = function (e) {
    if (!e.target.matches(".menu-link")) {
        const dropdowns = document.querySelectorAll(
            ".menu-dropdown, .information-dropdown",
        );
        dropdowns.forEach((dd) => dd.classList.remove("show"));
    }
};
