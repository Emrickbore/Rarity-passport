

const watchDatabase = [
  // ── ROLEX ──────────────────────────────────────────────────
  {
    id: 1,
    brand: "Rolex",
    name: "Submariner",
    reference: "124060",
    year: 2020,
    price: "8,100 €",
    movement: "Calibre 3230",
    power_reserve: "70 heures",
    case_size: "41mm",
    material: "Oystersteel",
    water_resistance: "300m",
    dial: "Noir",
    bracelet: "Oyster, acier Oystersteel",
    description: "La référence parmi les montres de plongée. Le Submariner est la montre qui a ouvert les profondeurs sous-marines. Dotée d'un cadran noir luminescent et d'une lunette tournante unidirectionnelle, elle incarne la robustesse et l'élégance.",
    image: "submariner.jpg",
    pdf: "submariner.pdf"
  },
  {
    id: 2,
    brand: "Rolex",
    name: "Submariner Date",
    reference: "126610LN",
    year: 2020,
    price: "9,150 €",
    movement: "Calibre 3235",
    power_reserve: "70 heures",
    case_size: "41mm",
    material: "Oystersteel",
    water_resistance: "300m",
    dial: "Noir",
    bracelet: "Oyster, acier Oystersteel",
    description: "Version avec date du légendaire Submariner. Équipée du calibre 3235, cette montre allie la fonctionnalité d'un affichage de la date à la performance d'une montre de plongée professionnelle.",
    image: "submariner_date.jpg",
    pdf: "submariner_date.pdf"
  },
  {
    id: 3,
    brand: "Rolex",
    name: "Daytona",
    reference: "116500LN",
    year: 2016,
    price: "14,800 €",
    movement: "Calibre 4130",
    power_reserve: "72 heures",
    case_size: "40mm",
    material: "Oystersteel",
    water_resistance: "100m",
    dial: "Blanc / Noir Panda",
    bracelet: "Oyster, acier Oystersteel",
    description: "Le chronographe cosmographe Daytona est une icône parmi les montres de sport. Conçue pour les pilotes de course, elle offre une précision chronométrique exceptionnelle avec son mouvement manufacture.",
    image: "daytona.jpg",
    pdf: "daytona.pdf"
  },
  {
    id: 4,
    brand: "Rolex",
    name: "Datejust",
    reference: "126334",
    year: 2017,
    price: "10,500 €",
    movement: "Calibre 3235",
    power_reserve: "70 heures",
    case_size: "41mm",
    material: "Rolesor (Oystersteel + Or gris 18ct)",
    water_resistance: "100m",
    dial: "Bleu",
    bracelet: "Jubilee, Rolesor",
    description: "La Datejust est l'archétype de la montre classique. Première montre-bracelet chronomètre au monde à afficher la date, elle est le symbole intemporel du style et de la performance.",
    image: "datejust.jpg",
    pdf: "datejust.pdf"
  },
  {
    id: 5,
    brand: "Rolex",
    name: "GMT-Master II",
    reference: "126710BLNR",
    year: 2019,
    price: "10,900 €",
    movement: "Calibre 3285",
    power_reserve: "70 heures",
    case_size: "40mm",
    material: "Oystersteel",
    water_resistance: "100m",
    dial: "Noir",
    bracelet: "Jubilee, acier Oystersteel",
    description: "Surnommée 'Batman' pour sa lunette bicolore bleu et noir, la GMT-Master II permet d'afficher simultanément l'heure de deux fuseaux horaires. Compagnon idéal des voyageurs internationaux.",
    image: "gmt_master.jpg",
    pdf: "gmt_master.pdf"
  },
  {
    id: 6,
    brand: "Rolex",
    name: "Day-Date",
    reference: "228238",
    year: 2015,
    price: "34,050 €",
    movement: "Calibre 3255",
    power_reserve: "70 heures",
    case_size: "40mm",
    material: "Or jaune 18ct",
    water_resistance: "100m",
    dial: "Champagne",
    bracelet: "President, or jaune 18ct",
    description: "Surnommée la 'Montre des Présidents', la Day-Date est le fleuron de Rolex. Exclusivement en métaux précieux, elle affiche le jour de la semaine en toutes lettres.",
    image: "daydate.jpg",
    pdf: "daydate.pdf"
  },

  // ── PATEK PHILIPPE ─────────────────────────────────────────
  {
    id: 7,
    brand: "Patek Philippe",
    name: "Nautilus",
    reference: "5711/1A-010",
    year: 2006,
    price: "35,000 €",
    movement: "Calibre 26-330 S C",
    power_reserve: "45 heures",
    case_size: "40mm",
    material: "Acier inoxydable",
    water_resistance: "120m",
    dial: "Bleu gradué",
    bracelet: "Acier inoxydable intégré",
    description: "Le Nautilus est l'une des montres les plus convoitées au monde. Dessinée par Gérald Genta en 1976, sa forme de hublot et son cadran bleu iconique en font un graal pour les collectionneurs.",
    image: "nautilus.jpg",
    pdf: "nautilus.pdf"
  },
  {
    id: 8,
    brand: "Patek Philippe",
    name: "Nautilus Chronograph",
    reference: "5980/1A-001",
    year: 2006,
    price: "52,000 €",
    movement: "Calibre CH 28-520 C",
    power_reserve: "55 heures",
    case_size: "40.5mm",
    material: "Acier inoxydable",
    water_resistance: "120m",
    dial: "Bleu-noir gradué",
    bracelet: "Acier inoxydable intégré",
    description: "La version chronographe du légendaire Nautilus. Ajoutant la complication chronographe au design iconique, cette pièce offre sportivité et haute horlogerie.",
    image: "nautilus_chrono.jpg",
    pdf: "nautilus_chrono.pdf"
  },
  {
    id: 9,
    brand: "Patek Philippe",
    name: "Aquanaut",
    reference: "5167A-001",
    year: 2007,
    price: "24,000 €",
    movement: "Calibre 324 S C",
    power_reserve: "45 heures",
    case_size: "40mm",
    material: "Acier inoxydable",
    water_resistance: "120m",
    dial: "Noir gaufré",
    bracelet: "Composite noir 'Tropical'",
    description: "Version plus sportive et contemporaine du Nautilus. L'Aquanaut séduit par son design arrondi, son cadran gaufré et son bracelet en composite ultra-confortable.",
    image: "aquanaut.jpg",
    pdf: "aquanaut.pdf"
  },
  {
    id: 10,
    brand: "Patek Philippe",
    name: "Calatrava",
    reference: "5227G-010",
    year: 2013,
    price: "32,000 €",
    movement: "Calibre 324 S C",
    power_reserve: "45 heures",
    case_size: "39mm",
    material: "Or gris 18ct",
    water_resistance: "30m",
    dial: "Blanc laqué",
    bracelet: "Alligator noir",
    description: "La Calatrava incarne la montre ronde par excellence. Depuis 1932, elle représente la pureté du design horloger classique. L'élégance dans sa forme la plus aboutie.",
    image: "calatrava.jpg",
    pdf: "calatrava.pdf"
  },
  {
    id: 11,
    brand: "Patek Philippe",
    name: "Grand Complications",
    reference: "5270P-001",
    year: 2018,
    price: "145,000 €",
    movement: "Calibre CH 29-535 PS Q",
    power_reserve: "55 heures",
    case_size: "41mm",
    material: "Platine",
    water_resistance: "30m",
    dial: "Bleu laqué",
    bracelet: "Alligator bleu",
    description: "Le sommet de la haute horlogerie. Ce chronographe à quantième perpétuel réunit les plus grandes complications dans un boîtier en platine d'une élégance rare.",
    image: "grand_complications.jpg",
    pdf: "grand_complications.pdf"
  },

  // ── AUDEMARS PIGUET ────────────────────────────────────────
  {
    id: 12,
    brand: "Audemars Piguet",
    name: "Royal Oak",
    reference: "15202ST.OO.1240ST.01",
    year: 2019,
    price: "24,500 €",
    movement: "Calibre 4302",
    power_reserve: "70 heures",
    case_size: "41mm",
    material: "Acier inoxydable",
    water_resistance: "50m",
    dial: "Bleu 'Grande Tapisserie'",
    bracelet: "Acier inoxydable intégré",
    description: "Icône absolue de l'horlogerie, le Royal Oak a été dessinée par Gérald Genta en 1972. Sa lunette octogonale et ses vis hexagonales apparentes sont devenus des symboles de l'audace horlogère.",
    image: "royal_oak.jpg",
    pdf: "royal.pdf"
  },
  {
    id: 13,
    brand: "Audemars Piguet",
    name: "Royal Oak Offshore",
    reference: "26470ST.OO.A027CA.01",
    year: 2014,
    price: "29,500 €",
    movement: "Calibre 3126/3840",
    power_reserve: "50 heures",
    case_size: "42mm",
    material: "Acier inoxydable",
    water_resistance: "100m",
    dial: "Bleu 'Méga Tapisserie'",
    bracelet: "Caoutchouc bleu",
    description: "Version plus imposante et sportive du Royal Oak. L'Offshore pousse le design iconique dans une direction plus audacieuse avec ses compteurs chronographe et son boîtier massif.",
    image: "royal_oak_offshore.jpg",
    pdf: "royal_oak_offshore.pdf"
  },
  {
    id: 14,
    brand: "Audemars Piguet",
    name: "Royal Oak Offshore Diver",
    reference: "15710ST.OO.A002CA.01",
    year: 2015,
    price: "22,800 €",
    movement: "Calibre 3120",
    power_reserve: "60 heures",
    case_size: "42mm",
    material: "Acier inoxydable",
    water_resistance: "300m",
    dial: "Noir 'Méga Tapisserie'",
    bracelet: "Caoutchouc noir",
    description: "La montre de plongée de la famille Royal Oak Offshore. Étanche à 300 mètres, elle combine le design octogonal emblématique avec des performances de plongée professionnelle.",
    image: "royal_oak_offshore_diver.jpg",
    pdf: "royal_oak_offshore_diver.pdf"
  },
  {
    id: 15,
    brand: "Audemars Piguet",
    name: "Code 11.59",
    reference: "26393CR.OO.A002CR.01",
    year: 2019,
    price: "42,000 €",
    movement: "Calibre 4401",
    power_reserve: "70 heures",
    case_size: "41mm",
    material: "Or rose 18ct",
    water_resistance: "30m",
    dial: "Bleu fumé laqué",
    bracelet: "Alligator bleu",
    description: "La collection la plus récente d'Audemars Piguet. Le Code 11.59 repousse les codes de la manufacture avec un design contemporain audacieux, un boîtier architectural et des finitions exceptionnelles.",
    image: "code_1159.jpg",
    pdf: "code_1159.pdf"
  },
  {
    id: 16,
    brand: "Audemars Piguet",
    name: "Royal Oak Perpetual Calendar",
    reference: "26574ST.OO.1220ST.01",
    year: 2015,
    price: "68,000 €",
    movement: "Calibre 5134",
    power_reserve: "40 heures",
    case_size: "41mm",
    material: "Acier inoxydable",
    water_resistance: "20m",
    dial: "Bleu 'Grande Tapisserie'",
    bracelet: "Acier inoxydable intégré",
    description: "Le Royal Oak avec quantième perpétuel représente le mariage parfait entre le design sportif iconique et la grande complication horlogère. Affiche jour, date, mois et phases de lune.",
    image: "royal_oak_perpetual.jpg",
    pdf: "royal_oak_perpetual.pdf"
  }
];

function searchWatches(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return watchDatabase.filter(watch => {
    const searchable = [
      watch.brand,
      watch.name,
      watch.reference,
      watch.brand + ' ' + watch.name,
      watch.brand + ' ' + watch.name + ' ' + watch.reference,
      watch.name + ' ' + watch.reference
    ].map(s => s.toLowerCase());
    return searchable.some(s => s.includes(q));
  });
}

function getWatchById(id) {
  return watchDatabase.find(w => w.id === parseInt(id));
}

function getWatchesByBrand(brand) {
  return watchDatabase.filter(w => w.brand.toLowerCase() === brand.toLowerCase());
}

function getSuggestions(query) {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();
  return watchDatabase.filter(watch => {
    const fields = [
      watch.brand.toLowerCase(),
      watch.name.toLowerCase(),
      watch.reference.toLowerCase(),
      (watch.brand + ' ' + watch.name).toLowerCase(),
      (watch.brand + ' ' + watch.name + ' ' + watch.reference).toLowerCase()
    ];
    return fields.some(f => f.includes(q));
  }).slice(0, 8);
}
