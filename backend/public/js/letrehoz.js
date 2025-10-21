async function letrehoz(event) {
    event.preventDefault();
    const nev = document.querySelector('#nev').value;
    const nemzetiseg = document.querySelector('#nemzetiseg').value;
    const szuletes = document.querySelector('#szuletes').value;
    const korosztaly = document.querySelector('#korosztaly').value;
    const poszt = document.querySelector('#poszt').value;
    const ugyesebblaba = document.querySelector('#ugyesebblaba').value;
    const gol = document.querySelector('#gol').value;
    const golpassz = document.querySelector('#golpassz').value;
    const kep = document.querySelector('#kep').value;

    const response = await fetch('/api/new-player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nev,
            nemzetiseg,
            szuletes,
            korosztaly,
            poszt,
            ugyesebblaba,
            gol,
            golpassz,
            kep,
        }),
    });

    console.log(response);

    if (response.ok) {
        const resp = await response.json();
        window.alert(resp.msg);
        window.location.href = '/api/players-backend';
    } else {
        const resp = await response.json();
        window.alert(resp.msg);
    }
}
