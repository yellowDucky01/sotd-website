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

let peakPlayers = localStorage.getItem("peak") || 0;

async function fetchServer() {
    try {
        const res = await fetch(
            "https://api.battlemetrics.com/servers/38593009",
        );
        const data = await res.json();

        const attr = data.data.attributes;

        const statusEl = document.getElementById("status");
        const playersEl = document.getElementById("players");
        const peakEl = document.getElementById("peak");

        if (attr.status === "online") {
            statusEl.innerText = "ONLINE";
            statusEl.style.color = "limegreen";
        } else {
            statusEl.innerText = "OFFLINE";
            statusEl.style.color = "red";
        }

        const currentPlayers = attr.players;
        const maxPlayers = attr.maxPlayers;
        playersEl.innerText = `${currentPlayers} / ${maxPlayers}`;

        if (currentPlayers == 0) {
            statusEl.innerText = "OFFLINE";
            statusEl.style.color = "red";
        }
        if (currentPlayers > peakPlayers) {
            peakPlayers = currentPlayers;
            localStorage.setItem("peak", peakPlayers);
        }
        peakEl.innerText = peakPlayers;
    } catch (err) {
        const statusEl = document.getElementById("status");
        statusEl.innerText = "ERROR";
        statusEl.style.color = "orange";
    }
}

fetchServer();
setInterval(fetchServer, 10000);