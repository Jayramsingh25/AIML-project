async function getOptimization() {
    const bikes = parseInt(document.getElementById('bikes').value);
    const autos = parseInt(document.getElementById('autos').value);
    const cars = parseInt(document.getElementById('cars').value);
    const trucks = parseInt(document.getElementById('trucks').value);

    // Change this line to your actual Render URL + /predict
const API_URL = "https://traffic-light-optimization-jsss.onrender.com/predict"; // UPDATE THIS

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bikes, autos, cars, trucks })
        });
        const data = await response.json();
        
        document.getElementById('pcu-val').innerText = `PCU: ${data.pcu_count}`;
        startSignalCycle(data.green_light, data.amber_light);
    } catch (err) {
        alert("Make sure your Render API is awake and the URL is correct!");
    }
}

function startSignalCycle(greenTime, amberTime) {
    const r = document.getElementById('red');
    const a = document.getElementById('amber');
    const g = document.getElementById('green');
    const t = document.getElementById('timer');

    // Reset
    [r, a, g].forEach(l => l.classList.remove('active'));

    // Green Phase
    g.classList.add('active');
    let count = greenTime;
    const intv = setInterval(() => {
        t.innerText = count;
        count--;
        if (count < 0) {
            clearInterval(intv);
            // Amber Phase
            g.classList.remove('active');
            a.classList.add('active');
            t.innerText = amberTime;
            setTimeout(() => {
                a.classList.remove('active');
                r.classList.add('active');
                t.innerText = "--";
            }, amberTime * 1000);
        }
    }, 1000);
}