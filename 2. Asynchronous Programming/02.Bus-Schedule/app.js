function solve() {
    const departBtnElement = document.getElementById('depart');
    const arriveBtnElement = document.getElementById('arrive');
    const infoElement = document.querySelector('#info span');

    let stop = {
        next: 'depot'
    };

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next} `;
        const res = await fetch(url);
        if (res.status !== 200) {
            infoElement.textContent = 'Error';
            departBtnElement.disabled = true;
            arriveBtnElement.disabled = true;
        };
        stop = await res.json();
        infoElement.textContent = `Next stop ${stop.name}`;
        departBtnElement.disabled = true;
        arriveBtnElement.disabled = false;
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stop.name}`;
        arriveBtnElement.disabled = true;
        departBtnElement.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();