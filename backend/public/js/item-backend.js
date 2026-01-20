async function szerkesztes(id){
    const nev = document.getElementById('nev').value;
    const statusz = document.getElementById('statusz').value;

    if (statusz === '') {
        window.alert('A státusz nem lehet üres');
        return;
    }

    const response = await fetch(`/users-backend/modosit/${id}`,{
        method: 'PUT',
        headers: {
            'content-type':'application/json',
        },
        body:JSON.stringify({nev,statusz}),
    });

    const valasz = await response.json();

    if (response.ok) {
        window.alert(valasz.msg);
        window.location = '/users-backend';
    } else {
        window.alert(valasz.msg);
    }
}

async function termektorles(id) {
    console.log(id);
    const response = await fetch(`/api/items-backend/${id}`, {
        method:'DELETE',
    });

    const valasz = await response.json();

    if (response.ok) {
        window.alert(valasz.msg);
        window.location = '/api/items-backend';
    } else  {
    window.alert(valasz.msg);
    }
}

// async function termekmodositas(id) {
//     console.log('Módosítás:', id);
    
//     try {
//         // Adatok bekérése
//         const ujNev = window.prompt('Új név:', '');
//         if (ujNev === null) return; // Mégse
        
//         if (!ujNev.trim()) {
//             window.alert('A név nem lehet üres!');
//             return;
//         }
        
//         // Adatok összeállítása
//         const updateData = {
//             nev: ujNev.trim()
//         };
        
        
//         // PUT kérés küldése
//         const response = await fetch(`/api/items-backend/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updateData)
//         });

//         const valasz = await response.json();

//         if (response.ok) {
//             window.alert(valasz.msg || 'Sikeres módosítás!');
//             window.location.reload();
//         } else {
//             window.alert(valasz.msg || 'Hiba történt a módosítás során!');
//         }
//     } catch (error) {
//         console.error('Hiba:', error);
//         window.alert('Hiba történt!');
//     }
// }