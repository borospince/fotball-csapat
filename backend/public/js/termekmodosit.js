async function Termekmodosit(event, id) {
    event.preventDefault();
    const nev = document.querySelector('#nev').value;
    const termekleiras = document.querySelector('#termekleiras').value;
    const ar = document.querySelector('#ar').value;
    const mennyiseg = document.querySelector('#mennyiseg').value;
    const mennyisegiEgyseg = document.querySelector('#mennyisegiEgyseg').value;
    // const kep = document.querySelector('#kep').value;

    const response = await fetch(`/api/items-backend/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nev,
            termekleiras,
            ar,
            mennyiseg,
            mennyisegiEgyseg,
        }),
    });

    console.log(response);

    if (response.ok) {
        const resp = await response.json();
        window.alert(resp.msg);
        window.location.href = '/api/items-backend';
    } else {
        const resp = await response.json();
        window.alert(resp.msg);
    }
}
