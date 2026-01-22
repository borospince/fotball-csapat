const Match = require('../models/Match');

const seedMatches = async () => {
    const count = await Match.countDocuments();
    if (count > 0) {
        await Match.updateMany(
            {},
            {
                $set: {
                    sajatCsapat: 'Izeltlábúak FC',
                    jegyElerheto: true,
                },
            }
        );
        return;
    }

    const baseTeam = 'Izeltlábúak FC';
    const matches = [
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Ferencváros',
            helyszin: 'Nemzeti Sportaréna',
            datum: new Date('2026-02-01T18:00:00'),
            hazaiIdegen: 'hazai',
            liga: 'NB I',
            korosztaly: 'Felnőtt',
            eredmeny: '',
            jegyElerheto: true,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Újpest',
            helyszin: 'Szusza Ferenc Stadion',
            datum: new Date('2026-02-08T16:30:00'),
            hazaiIdegen: 'idegen',
            liga: 'NB I',
            korosztaly: 'Felnőtt',
            eredmeny: '',
            jegyElerheto: true,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Debrecen',
            helyszin: 'Nagyerdei Stadion',
            datum: new Date('2026-02-15T17:00:00'),
            hazaiIdegen: 'idegen',
            liga: 'NB I',
            korosztaly: 'U19',
            eredmeny: '',
            jegyElerheto: true,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Puskás Akadémia',
            helyszin: 'Pancho Aréna',
            datum: new Date('2026-02-21T14:00:00'),
            hazaiIdegen: 'idegen',
            liga: 'NB I',
            korosztaly: 'U19',
            eredmeny: '',
            jegyElerheto: false,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'MTK Budapest',
            helyszin: 'Nemzeti Sportaréna',
            datum: new Date('2026-02-28T19:30:00'),
            hazaiIdegen: 'hazai',
            liga: 'NB I',
            korosztaly: 'Felnőtt',
            eredmeny: '',
            jegyElerheto: true,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Real Madrid',
            helyszin: 'Nemzeti Sportaréna',
            datum: new Date('2026-03-04T20:00:00'),
            hazaiIdegen: 'hazai',
            liga: 'Bajnokok Ligája',
            korosztaly: 'Felnőtt',
            eredmeny: '',
            jegyElerheto: true,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Bayern München',
            helyszin: 'Allianz Arena',
            datum: new Date('2026-03-11T20:00:00'),
            hazaiIdegen: 'idegen',
            liga: 'Bajnokok Ligája',
            korosztaly: 'Felnőtt',
            eredmeny: '',
            jegyElerheto: true,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Paris Saint-Germain',
            helyszin: 'Parc des Princes',
            datum: new Date('2026-03-18T20:00:00'),
            hazaiIdegen: 'idegen',
            liga: 'Bajnokok Ligája',
            korosztaly: 'U19',
            eredmeny: '',
            jegyElerheto: false,
        },
        {
            sajatCsapat: baseTeam,
            ellenfel: 'Inter',
            helyszin: 'San Siro',
            datum: new Date('2026-03-25T20:00:00'),
            hazaiIdegen: 'idegen',
            liga: 'Bajnokok Ligája',
            korosztaly: 'U19',
            eredmeny: '',
            jegyElerheto: true,
        },
    ];

    await Match.insertMany(matches);
};

module.exports = seedMatches;
