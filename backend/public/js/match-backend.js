async function meccsTorles(id) {
    const response = await fetch(`/api/matches-backend/${id}`, {
        method: 'DELETE',
    });

    const valasz = await response.json();

    if (response.ok) {
        window.alert(valasz.msg);
        window.location = '/api/matches-backend';
    } else {
        window.alert(valasz.msg);
    }
}
