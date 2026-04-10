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

const startDate = new Date(2026, 3, 8);
const endDate = new Date(2026, 5, 8);

function updateProgress() {
    const now = new Date();

    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

    let percent = (daysPassed / totalDays) * 100;

    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    const level = document.getElementById("level");
    const text = document.getElementById("percentText");

    level.style.width = percent + "%";
    text.innerText = percent.toFixed(2) + "% completed";

    if (percent < 30) level.style.background = "red";
    else if (percent < 70) level.style.background = "orange";
    else level.style.background = "limegreen";
}

updateProgress();
setInterval(updateProgress, 1000);