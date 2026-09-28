/* ============================================================
   MYÓ — LOUNGE BAR & RESTAURANT · Napoli Vomero
   FILE DATI UNICO — modifica QUI ogni testo, prezzo, orario.
   Non serve toccare l'HTML o il CSS.
   ------------------------------------------------------------
   Come modificare:
   - Cambiare un prezzo/piatto: trova la lista nel blocco "menu"
     e modifica name / desc / price. Lascia price: "" per non
     mostrare il prezzo.
   - Cambiare orari: blocco "hours" (0 = Lunedì ... 6 = Domenica).
     null = chiuso.  ["19:00","00:30"] = apertura/chiusura.
   - Cambiare telefono/WhatsApp/Instagram: blocco "contact".
   ============================================================ */

window.MYO = {

  /* ---------- IDENTITÀ ---------- */
  brand: {
    name: "Myó",
    tagline: "Lounge Bar & Restaurant",
    claim: "Cena, dinner show e karaoke nel cuore del Vomero.",
    city: "Napoli · Vomero"
  },

  /* ---------- CONTATTI ---------- */
  contact: {
    address: "Via Raffaele Morghen, 34",
    zipCity: "80129 Napoli (NA)",
    phone: "0810194193",           // per il tasto "Chiama"
    phonePretty: "081 019 4193",
    whatsapp: "393391069547",      // formato internazionale senza + e senza spazi
    instagram: "https://www.instagram.com/myonapoli/",
    instagramHandle: "@myonapoli",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=My%C3%B2+Via+Raffaele+Morghen+34+Napoli",
    // coordinate approssimative Via Raffaele Morghen (Vomero) — per schema/mappa
    geo: { lat: 40.8447, lng: 14.2295 }
  },

  /* ---------- ORARI (0=Lun ... 6=Dom) · null = chiuso ---------- */
  hours: [
    null,                 // Lunedì
    null,                 // Martedì
    ["19:00", "00:30"],   // Mercoledì
    ["19:00", "00:30"],   // Giovedì
    ["19:00", "00:30"],   // Venerdì
    ["19:00", "00:30"],   // Sabato
    ["19:00", "00:30"]    // Domenica
  ],

  /* ---------- SEZIONE CIBO ---------- */
  cibo: {
    kicker: "La cucina",
    title: "Il gusto di Napoli, servito col ritmo giusto",
    text: "Piatti curati nel dettaglio, materie prime del territorio e un impiattamento che è già spettacolo — serviti, come vuole la tradizione, sul tamburello. Dalla cena tra amici alla serata speciale, la cucina del Myó accompagna ogni momento.",
    // Le liste qui sotto guidano il menù mostrato in pagina.
    // Aggiungi il prezzo tra virgolette (es. "12") per farlo comparire.
    menu: [
      {
        listTitle: "Da condividere",
        note: "L'inizio perfetto della serata.",
        items: [
          { name: "Tagliere Myó", desc: "Salumi, formaggi campani e sfizi fritti", price: "", tags: [] },
          { name: "Crudité di mare", desc: "Selezione del giorno del nostro pescato", price: "", tags: ["signature"] },
          { name: "Montanarine", desc: "Pizzelle fritte, pomodoro del piennolo e basilico", price: "", tags: [] }
        ]
      },
      {
        listTitle: "I piatti",
        note: "Terra e mare, con un'anima contemporanea.",
        items: [
          { name: "Paccheri del golfo", desc: "Pasta di Gragnano, frutti di mare e datterino", price: "", tags: ["signature"] },
          { name: "Risotto agli agrumi", desc: "Mantecato al limone di Sorrento e gambero rosso", price: "", tags: [] },
          { name: "Filetto alla brace", desc: "Con riduzione all'Aglianico e patate schiacciate", price: "", tags: [] },
          { name: "Parmigiana rivisitata", desc: "La classica napoletana in chiave d'autore", price: "", tags: ["veg"] }
        ]
      },
      {
        listTitle: "Dolci",
        note: "",
        items: [
          { name: "Fragola Myó", desc: "Il nostro dessert firma, come nel logo", price: "", tags: ["signature"] },
          { name: "Babà al rum", desc: "Soffice, tradizionale, servito al momento", price: "", tags: [] }
        ]
      }
    ]
  },

  /* ---------- SEZIONE DRINK ---------- */
  drink: {
    kicker: "Il bar",
    title: "Miscelazione d'autore, luce al neon",
    text: "Signature cocktail, grandi classici e proposte analcoliche preparati al bancone da chi la sa lunga. Un bicchiere ben fatto è il modo migliore per iniziare — o chiudere — la notte al Myó.",
    menu: [
      {
        listTitle: "Signature",
        note: "Le firme della casa.",
        items: [
          { name: "Myó Sour", desc: "Il nostro twist agrumato, servito con carattere", price: "", tags: ["signature"] },
          { name: "Fragola & Fumo", desc: "Fragola, mezcal e un tocco affumicato", price: "", tags: ["signature"] },
          { name: "Vesuvio", desc: "Rosso, deciso, con scorza d'arancia", price: "", tags: [] }
        ]
      },
      {
        listTitle: "I classici",
        note: "",
        items: [
          { name: "Negroni", desc: "Gin, bitter, vermouth rosso", price: "", tags: [] },
          { name: "Spritz", desc: "Il rito dell'aperitivo, sempre", price: "", tags: [] },
          { name: "Americano", desc: "Bitter, vermouth e soda", price: "", tags: [] }
        ]
      },
      {
        listTitle: "Analcolici & Bollicine",
        note: "",
        items: [
          { name: "Vergine della casa", desc: "Fresco, fruttato, zero alcol", price: "", tags: ["analcolico"] },
          { name: "Calice di bollicine", desc: "Selezione al calice", price: "", tags: [] }
        ]
      }
    ]
  },

  /* ---------- SEZIONE LOCATION ---------- */
  location: {
    kicker: "Il posto",
    title: "Una giungla urbana al Vomero",
    text: "Varcare la soglia del Myó è entrare in un'altra dimensione: verde rigoglioso, luci al neon, atmosfera intima e sorprendente. Un lounge bar & restaurant pensato per stupire, a due passi da Via Scarlatti, nel cuore pulsante del Vomero.",
    points: [
      "Ambiente immersivo, luci soffuse e dettagli curati",
      "Sala ristorante + zona lounge per il dopocena",
      "Perfetto per coppie, gruppi e serate speciali"
    ]
  },

  /* ---------- SEZIONE SERATA ---------- */
  serata: {
    kicker: "L'intrattenimento",
    title: "Dinner show, karaoke e tanto divertimento",
    text: "Al Myó la cena è solo l'inizio. Musica dal vivo, dinner show e karaoke trasformano ogni serata in uno spettacolo. Dal mercoledì alla domenica, il Vomero balla, canta e brinda con noi.",
    program: [
      { day: "Mer – Gio", label: "Cena & musica", desc: "Atmosfera lounge, la giusta colonna sonora per la sera" },
      { day: "Venerdì", label: "Dinner Show", desc: "Cena spettacolo: intrattenimento dal vivo al tavolo" },
      { day: "Sabato", label: "Karaoke Night", desc: "Sali sul palco: la voce della serata sei tu" },
      { day: "Domenica", label: "Sunday Vibes", desc: "Chiudi il weekend tra buon cibo e buona musica" }
    ]
  },

  /* ---------- SEZIONE FESTEGGIA / PRENOTA ---------- */
  festeggia: {
    kicker: "Il tuo evento",
    title: "Festeggia da Myó",
    text: "Compleanni, lauree, addii al celibato e nubilato, cene aziendali o semplicemente una serata coi tuoi: organizziamo tutto noi. Prenota il tavolo o richiedi il tuo evento su misura — ti rispondiamo su WhatsApp.",
    // opzioni orario mostrate nel form (dentro l'orario di apertura)
    // vengono generate in automatico dagli orari; questo è il passo in minuti
    slotStepMin: 30
  }

};
