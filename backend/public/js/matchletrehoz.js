async function Meccsletrehoz(event) {
    event.preventDefault();
    const sajatCsapat = document.querySelector('#sajatCsapat').value;
    const ellenfel = document.querySelector('#ellenfel').value;
    const helyszin = document.querySelector('#helyszin').value;
    const datum = document.querySelector('#datum').value;
    const hazaiIdegen = document.querySelector('#hazaiIdegen').value;
    const eredmeny = document.querySelector('#eredmeny').value;
    const jegyLink = document.querySelector('#jegyLink').value;
    const jegyElerheto = document.querySelector('#jegyElerheto').value === 'true';
    const liga = document.querySelector('#liga').value;
    const korosztaly = document.querySelector('#korosztaly').value;

    const response = await fetch('/api/new-match', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sajatCsapat,
            ellenfel,
            helyszin,
            datum,
            hazaiIdegen,
            eredmeny,
            jegyLink,
            jegyElerheto,
            liga,
            korosztaly,
        }),
    });

    if (response.ok) {
        const resp = await response.json();
        window.alert(resp.msg);
        window.location.href = '/api/matches-backend';
    } else {
        const resp = await response.json();
        window.alert(resp.msg);
    }
}
