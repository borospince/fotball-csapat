import React from 'react'
import './News.css'

const News = () => {
  return (
    <div className="news-kontener">
      <h1>Friss Hírek – Ízeltlábúak FC</h1>
      <div className="news-grid">
        <div className="news-card">
          <h2>Mandíbula visszatér Bogárvárra!</h2>
          <p>A korábbi Ízeltlábúak FC-gólkirály, Carlos Mandíbula bejelentette, hogy a 2025/26-os szezonra visszatér a Kitinvár Arénába, immár edzőként!</p>
          <span className="date">2025. november 6.</span>
        </div>

        <div className="news-card">
          <h2>Kitin-derbi: 4–0 az Ízeltlábúaknak!</h2>
          <p>Mandíbula ideiglenes edzőként a fiatal Cincér Csaba duplájával vezette győzelemre a csapatot. A Raj új rigmust zümmögött: „Zümmögj, ha győzünk!”</p>
          <span className="date">2025. november 4.</span>
        </div>

        <div className="news-card">
          <h2>Új stadionbővítés a láthatáron</h2>
          <p>A Kitinvár Aréna 2026-ra 45 000 férőhelyesre bővülhet. Az új szektorokat „Hangyaboly” és „Méhtér” néven tervezik.</p>
          <span className="date">2025. november 2.</span>
        </div>

        <div className="news-card">
          <h2>„Sáska” Sándor unokája az U21-es válogatottban</h2>
          <p>Sáska Marcell 6 gólt szerzett az NB II-ben, és bekerült a magyar U21-es válogatottba. A szurkolók szerint „ugyanúgy repül a pályán, mint nagyapja”.</p>
          <span className="date">2025. október 29.</span>
        </div>

        <div className="news-card">
          <h2>Bajusz Bence: „A Raj hangja nélkül nem tudnék védeni”</h2>
          <p>A kapus elárulta, hogy minden meccs előtt meghallgatja a szurkolók zümmögését rögzített felvételről – „a Raj adja az erőt”.</p>
          <span className="date">2025. október 27.</span>
        </div>

        <div className="news-card">
          <h2>Hangya Henrik jubileumi mérkőzése</h2>
          <p>A klub ikonja, Hangya Henrik 400. meccsét játszotta zöld-feketében. A Raj egy hatalmas transzparenssel köszöntötte: „A Dolgozó örökké dolgozik!”.</p>
          <span className="date">2025. október 25.</span>
        </div>

        <div className="news-card">
          <h2>Új mezszponzor: MézMester Kft.</h2>
          <p>Az Ízeltlábúak FC új, természetbarát szponzort jelentett be: a MézMester Kft. méhviasszal készült logója díszíti a 2026-os mezeket.</p>
          <span className="date">2025. október 23.</span>
        </div>

        <div className="news-card">
          <h2>Fiatal tehetségek az akadémián</h2>
          <p>Az utánpótlásból öt új játékos került fel az első keretbe, köztük a 17 éves Lepke Lajos, akit már most a „Szárnyas Csoda”-ként emlegetnek.</p>
          <span className="date">2025. október 21.</span>
        </div>

        <div className="news-card">
          <h2>Rajzengés Fesztivál a Kitinvár Arénában</h2>
          <p>A klub őszi fesztivált rendezett a szurkolóknak koncertekkel, családi programokkal és retró mezek bemutatójával. A belépés ingyenes volt minden bérletes számára.</p>
          <span className="date">2025. október 18.</span>
        </div>
      </div>
    </div>
  )
}

export default News