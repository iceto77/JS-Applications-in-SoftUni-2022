async function getInfo() {
    const stopNameElement = document.getElementById('stopName');
    const busesElement = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        stopNameElement.textContent = 'Моля изчакайте....';
        busesElement.innerHTML = '';
        const res = await fetch(url);
        if (res.status !== 200) {
            throw new Error('Stop Id not found');
        };
        const data = await res.json();
        stopNameElement.textContent = data.name;
        Object.entries(data.buses).forEach(b => {
            let newLi = document.createElement('li');
            newLi.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            busesElement.appendChild(newLi);
        });
    } catch (error) {
        stopNameElement.textContent = 'Error';
    }
    console.log(data);
}