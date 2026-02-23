import React from "react";
import "./History.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const History = () => {
  const { lang } = useLanguage();
  const isHu = lang === "hu";

  return (
    <div className="tori-kontener">
      {isHu ? (
        <>
          <h1>Ízeltlábúak FC története</h1>
          <p>
            Alapítás: <b>1932</b>, Bogárvár (fiktív magyar város, erdők és mezők
            ölelésében) Stadion: Kitinvár Aréna (<b>38 000</b> férőhely,{" "}
            <b>2001</b>-ben épült) Színek: Zöld–fekete A kezdetek (
            <b>1932–1950</b>) A csapatot rovarász egyetemisták és helyi munkások
            alapították, innen ered a különleges név. Már az első évtizedben
            megmutatták erejüket, főként a helyi bajnokságban. <b>1939</b>: első
            jelentős siker, megnyerték a Regionális Kupát. Legenda született:
            „Sáska” Sándor, a balszélső, aki elképesztő gyorsaságáról kapta
            becenevét. Az aranyévek (<b>1955–1975</b>) Az Ízeltlábúak FC a
            hatvanas években Magyarország egyik legerősebb klubjává vált.{" "}
            <b>1957</b>: első NB I bajnoki cím <b>1961–1963</b>: háromszoros
            bajnok sorozatban Ikonikus játékos: Bogár Béla, középhátvéd, aki
            mindenkit „összezúzott” a védelemben. <b>1965</b>: Magyar
            Kupa-győzelem <b>1970</b>: UEFA Kupa negyeddöntő, ahol legyőzték a
            Sevillát, de kiestek a Juventus ellen. Hullámvölgy és túlélés (
            <b>1980–1995</b>) A nyolcvanas években a klub pénzügyi gondokkal
            küzdött, és több tehetség külföldre távozott. <b>1987</b>-ben
            kiestek az NB I-ből. Ennek ellenére ekkor tűnt fel a klub egyik
            legnagyobb ikonja: „Pók” Péter, a kapus, akinek elképesztő reflexeit
            a szurkolók hálós ugrásokhoz hasonlították. <b>1992</b>-ben
            visszajutottak az első osztályba. Modern korszak (
            <b>2000</b>–napjainkig) <b>2001</b>: felépült a Kitinvár Aréna,
            modern stadion zöld-fekete székekkel. <b>2008</b>: Magyar
            Kupa-győzelem, döntőben <b>3–1</b>-re verték a Dunavárosi Sasokat.{" "}
            <b>2014</b>: új bajnoki cím, az első <b>51</b> év után! <b>2016</b>:
            EL-csoportkör, bravúros <b>2–0</b> a Lazio ellen. <b>2023</b>:{" "}
            <b>90</b> éves jubileum, különleges mezekkel ünnepeltek. Kiemelt
            játékosok „Sáska” Sándor (<b>1930–40</b>-es évek) – villámgyors
            balszélső Bogár Béla (<b>1950–60</b>-as évek) – legendás
            középhátvéd „Pók” Péter (<b>1980–90</b>-es évek) – akrobatikus kapus
            Hangya Henrik (<b>2005–2015</b>) – szívós középpályás, beceneve:
            „A Dolgozó” Carlos Mandíbula (<b>2012–2018</b>) – spanyol csatár, a
            „csáprágó” gólvágó Megnyert trófeák NB I bajnoki címek:{" "}
            <b>5 (1957, 1961, 1962, 1963, 2014)</b> Magyar Kupa:{" "}
            <b>3 (1965, 2008, 2017)</b> Szuperkupa: <b>1 (2014)</b> Szurkolói
            kultúra A szurkolók neve: „A Raj”. Meccs előtt mindig zúgó
            zümmögéssel kezdik a szurkolást, mintha rovarraj lenne a stadionban.
            Kedvenc rigmusuk: „Zöld-fekete szárnyalás, Ízeltlábú győzelem vár!”
            Kabalájuk egy óriási jelmezes szkarabeusz, „Kitti, a Bogár”, aki
            minden gólnál végiggurul egy óriási felfújható labdán. Rivalizálás
            Az Ízeltlábúak FC legnagyobb riválisa a Páncélosok SC, egy szomszéd
            városi klub. A két csapat meccsét „Kitin-derbinek” nevezik. A
            szurkolók ilyenkor azt skandálják: „Raj zúg, páncél roppan,
            Ízeltlábú mindig jobban!”
          </p>
          <h1>
            A Legendás Kitin-derbi – <b>2014. május 24.</b>
          </h1>
          <p>
            Egy igazi fordulópontot, amit a szurkolók ma is emlegetnek. NB I,{" "}
            <b>30</b>. forduló – bajnoki döntő Ízeltlábúak FC – Páncélosok SC{" "}
            <b>3–2 (1–1)</b> Helyszín: Kitinvár Aréna – <b>38 000</b> néző
            (teltház) A tét Az Ízeltlábúak és a Páncélosok pontegyenlőséggel
            érkeztek az utolsó fordulóhoz. A győztes bajnok lett, döntetlen
            esetén a Páncélosok vitték volna a trófeát. A város már napok óta
            zümmögött – mindenhol zöld-fekete zászlók lógtak az ablakokból, a
            szurkolók pedig „rajba rendeződve” vonultak a stadionhoz. A mérkőzés
            menete <b>1</b>. félidő A <b>18</b>. percben a Páncélosok szereztek
            vezetést egy gyors kontra után: <b>0–1</b>. A vendégszektor
            felrobbant, a hazai szurkolók azonban azonnal rázendítettek a híres
            zümmögésre. A <b>41</b>. percben jött a válasz: Hangya Henrik óriási
            kapáslövéssel egyenlített <b>(1–1)</b>. A stadion dübörgött, mintha
            egy óriási méhkas ébredt volna fel. <b>2</b>. félidő A <b>60</b>.
            percben Carlos Mandíbula betalált egy szöglet után – a „Csáprágó” a
            védőket félrelökve fejelte be a labdát. <b>2–1</b> az
            Ízeltlábúaknak! A <b>75</b>. percben azonban dráma jött: tizenegyest
            kaptak a Páncélosok. A közönség fütyült, zúgott, de a csatár belőtte.{" "}
            <b>2–2</b>. Már úgy tűnt, döntetlen lesz, amikor a <b>89</b>. percben
            villant a cserejátékos: „Szöcske” Szabolcs beugrott a védők közé, és
            egy hatalmas ollózós gólt lőtt. <b>3–2</b>! A végjáték A
            hosszabbítás perceiben a Páncélosok még egyenlíthettek volna, de
            „Pók” Péter utódja, Bajusz Bence kapus elképesztő bravúrral védett.
            A bíró lefújta: Ízeltlábúak FC bajnok lett, <b>51</b> év után újra!
            Az ünneplés A „Raj” betódult a pályára, zöld-fekete füst és zümmögés
            töltötte meg a stadiont. A játékosok a szurkolókkal együtt körtáncot
            jártak, mintha egy óriási raj mozdult volna együtt. A kapitány,
            Hangya Henrik, könnyek között emelte a magasba a bajnoki trófeát. Ez
            a meccs azóta az „Arany Rajzás” néven él a klub történetében, és
            minden évben megemlékeznek róla a Kitinvár Arénában.
          </p>
        </>
      ) : (
        <>
          <h1>Izeltlabuak FC history</h1>
          <p>
            Founded: <b>1932</b>, Bogarvar (a fictional Hungarian town surrounded
            by forests and fields). Stadium: Kitinvar Arena (<b>38,000</b>{" "}
            seats, built in <b>2001</b>). Colors: green–black. The early years (
            <b>1932–1950</b>) The club was founded by entomology students and
            local workers, which gave the team its unique name. In the very
            first decade they already showed their strength, mainly in the
            local league. <b>1939</b>: first major success, they won the
            Regional Cup. A legend was born: “Grasshopper” Sandor, the left
            winger, nicknamed for his incredible pace. The golden years (
            <b>1955–1975</b>) Izeltlabuak FC became one of Hungary’s strongest
            clubs in the 1960s. <b>1957</b>: first NB I league title{" "}
            <b>1961–1963</b>: three consecutive championships. Iconic player:
            Bogar Bela, a center back who “crushed” everyone in defense.{" "}
            <b>1965</b>: Hungarian Cup victory. <b>1970</b>: UEFA Cup quarter
            final, they beat Sevilla but were eliminated by Juventus. Slump and
            survival (<b>1980–1995</b>) In the 1980s the club struggled with
            financial problems and several talents moved abroad. In <b>1987</b>
            they were relegated from NB I. Despite that, one of the club’s
            greatest icons emerged: “Spider” Peter, the goalkeeper whose reflex
            saves reminded fans of a web of leaps. In <b>1992</b> they returned
            to the top division. Modern era (<b>2000</b>–present) <b>2001</b>:
            the Kitinvar Arena was built, a modern stadium with green-black
            seats. <b>2008</b>: Hungarian Cup win, beating the Dunavarosi Eagles
            <b>3–1</b> in the final. <b>2014</b>: a new league title, the first
            after <b>51</b> years! <b>2016</b>: Europa League group stage, a
            brave <b>2–0</b> vs Lazio. <b>2023</b>: <b>90</b>th anniversary
            celebrated with special kits. Notable players “Grasshopper” Sandor
            (1930s–40s) – lightning-fast winger. Bogar Bela (1950s–60s) –
            legendary center back. “Spider” Peter (1980s–90s) – acrobatic
            goalkeeper. Hangya Henrik (2005–2015) – tireless midfielder,
            nickname: “The Worker”. Carlos Mandibula (2012–2018) – Spanish
            striker, the “Mandible” goal-scorer. Trophies NB I league titles:{" "}
            <b>5 (1957, 1961, 1962, 1963, 2014)</b>. Hungarian Cup:{" "}
            <b>3 (1965, 2008, 2017)</b>. Super Cup: <b>1 (2014)</b>. Fan
            culture Fans are called “The Swarm.” Before matches they start with
            a roaring buzzing, as if a swarm filled the stadium. Favorite chant:
            “Green and black on the wing, the Izeltlabuak victory we will sing!”
            Their mascot is a giant costumed scarab, “Kitti the Beetle,” who
            rolls across a huge inflatable ball after every goal. Rivalry The
            club’s biggest rival is Pancelosok SC, a neighboring city’s team.
            Their match is called the “Kitin Derby.” Fans chant: “Swarm is loud,
            armor will crack, Izeltlabuak are always on top!”
          </p>
          <h1>
            The Legendary Kitin Derby – <b>May 24, 2014</b>
          </h1>
          <p>
            A true turning point still remembered by fans. NB I, round <b>30</b>{" "}
            – title decider. Izeltlabuak FC – Pancelosok SC <b>3–2 (1–1)</b>.
            Venue: Kitinvar Arena – <b>38,000</b> spectators (sold out). The
            stakes: Izeltlabuak and Pancelosok arrived level on points for the
            final round. The winner would be champion; a draw would have handed
            the trophy to Pancelosok. The city had been buzzing for days – green
            and black flags everywhere, fans marching in “swarm formation” to
            the stadium. Match flow First half In the <b>18</b>th minute
            Pancelosok scored from a quick counter: <b>0–1</b>. The away end
            erupted, but the home fans instantly roared their famous buzzing
            chant. In the <b>41</b>st minute came the reply: Hangya Henrik
            volleyed a massive equalizer <b>(1–1)</b>. The stadium thundered as
            if a giant beehive had awakened. Second half In the <b>60</b>th
            minute Carlos Mandibula scored from a corner – the “Mandible” pushed
            defenders aside and headed it in. <b>2–1</b> to Izeltlabuak! In the{" "}
            <b>75</b>th minute drama struck: Pancelosok were awarded a penalty.
            The crowd whistled and roared, but the striker converted.{" "}
            <b>2–2</b>. It seemed headed for a draw until the <b>89</b>th minute
            when the substitute “Grasshopper” Szabolcs burst between defenders
            and fired in a huge bicycle kick. <b>3–2</b>! The finale In stoppage
            time Pancelosok nearly equalized, but Bajusz Bence, successor to
            “Spider” Peter, made an unbelievable save. The whistle blew: Izeltlabuak
            FC were champions again after <b>51</b> years! The celebration “The
            Swarm” flooded the pitch, green-black smoke and buzzing filled the
            stadium. Players and fans danced in a circle, moving like one giant
            swarm. Captain Hangya Henrik lifted the league trophy through
            tears. Since then this match has lived on as the “Golden Swarm” and
            is commemorated every year at the Kitinvar Arena.
          </p>
        </>
      )}
    </div>
  );
};

export default History;
