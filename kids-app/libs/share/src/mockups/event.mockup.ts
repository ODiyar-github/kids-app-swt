import { EventDTO } from "../api/event/event.dto";
import { InterestEnum } from "../util/enums/interest.enum";


export const EventMockups: EventDTO[] = [
  {
    uuid: 'd5e8b021-13f3-40dc-b12f-8e101b3ec101',
    title: 'Open Air Konzert am See',
    description: 'Ein einzigartiges Musikerlebnis unter freiem Himmel...',
    priceList: 'Eintritt: 15€, Kinder unter 12 kostenlos',
    address: 'Seepromenade 1, 10115 Berlin',
    location: { lat: 52.5200, lng: 13.4050 },
    category: [InterestEnum.Music, InterestEnum.Cooking],
    time: '19:30',
    date: '2025-07-14',
    age: '16+',
    image: ''
  },
  {
    uuid: 'a1f2e73d-6d2e-4d38-83ae-b34fc3d0928d',
    title: 'Tech Innovations 2025',
    description: 'Die führende Konferenz für Technologie-Enthusiasten...',
    priceList: 'Tagesticket: 49€, Studierende: 29€',
    address: 'Messezentrum 5, 80331 München',
    location: { lat: 48.1351, lng: 11.5820 },
    category: [InterestEnum.Technology, InterestEnum.Education],
    time: '10:00',
    date: '2025-08-05',
    age: '18+',
    image: ''
  },
  {
    uuid: '27b88324-6815-42d1-892b-7551594e5f60',
    title: 'Kunst im Park',
    description: 'Ein ganzer Tag voller Farben, Kreativität...',
    priceList: 'Eintritt frei',
    address: 'Stadtpark 4, 22767 Hamburg',
    location: { lat: 53.5511, lng: 9.9937 },
    category: [InterestEnum.Painting, InterestEnum.Family],
    time: '11:00',
    date: '2025-06-21',
    age: 'Alle',
    image: ''
  },
  {
    uuid: 'f4a726fb-24b4-4a07-ae2a-4710a412e1d9',
    title: 'Urban Sports Festival',
    description: 'Ein actionreiches Wochenende mit Parkour...',
    priceList: 'Tagespass: 10€, Wochenende: 18€',
    address: 'Sportgelände Süd, 50667 Köln',
    location: { lat: 50.9375, lng: 6.9603 },
    category: [InterestEnum.Sports, InterestEnum.Music],
    time: '12:00',
    date: '2025-07-10',
    age: '14+',
    image: ''
  },
  {
    uuid: '7cfb68f7-d88a-4f69-87d3-8e944db2634c',
    title: 'Veganes Genussfestival',
    description: 'Ein kulinarisches Erlebnis für alle...',
    priceList: 'Eintritt: 5€, Kinder unter 10 frei',
    address: 'Marktplatz 12, 70173 Stuttgart',
    location: { lat: 48.7758, lng: 9.1829 },
    category: [InterestEnum.Cooking, InterestEnum.Nature],
    time: '13:00',
    date: '2025-09-01',
    age: 'Alle',
    image: ''
  },
  {
    uuid: '0f8c54ee-1a4a-499c-8f62-df3584e6c8e3',
    title: 'Wandertag im Sauerland',
    description: 'Natur pur – entdecke gemeinsam mit anderen...',
    priceList: 'Teilnahmegebühr: 8€, Familienkarte: 20€',
    address: 'Wanderzentrum, 59872 Meschede',
    location: { lat: 51.3500, lng: 8.2833 },
    category: [InterestEnum.Nature, InterestEnum.Family],
    time: '08:00',
    date: '2025-08-20',
    age: '6+',
    image: ''
  },
  {
    uuid: '2d143539-6c5c-4f3b-9828-1c59a5402a6b',
    title: 'Street Food Weekend',
    description: 'Mehr als 50 internationale Food-Stände...',
    priceList: 'Eintritt: 4€, inkl. 1 Getränk',
    address: 'Innenstadtplatz, 45127 Essen',
    location: { lat: 51.4566, lng: 7.0123 },
    category: [InterestEnum.Cooking],
    time: '16:00',
    date: '2025-07-18',
    age: 'Alle',
    image: ''
  },
  {
    uuid: '57e0876c-b9e7-4c60-b2e5-8ef5d8cf0c69',
    title: 'Reise-Vortrag: Südamerika entdecken',
    description: 'Abenteuer pur – Reisejournalist:innen berichten...',
    priceList: 'Eintritt: 10€, ermäßigt: 6€',
    address: 'Kulturhaus Nord, 30159 Hannover',
    location: { lat: 52.3759, lng: 9.7320 },
    category: [InterestEnum.Traveling, InterestEnum.History],
    time: '18:00',
    date: '2025-10-10',
    age: '16+',
    image: ''
  },
  {
    uuid: '14d94aa2-3b4e-4d6a-890e-25df6dcdd0d5',
    title: 'Coding Bootcamp für Einsteiger',
    description: 'Tauche ein in die Welt der Webentwicklung...',
    priceList: 'Kosten: 199€, inkl. Verpflegung & Materialien',
    address: 'Innovationszentrum 3, 34117 Kassel',
    location: { lat: 51.3127, lng: 9.4797 },
    category: [InterestEnum.Technology, InterestEnum.Education],
    time: '09:00',
    date: '2025-11-01',
    age: '18+',
    image: ''
  },
  {
    uuid: '3c45a0f4-fd93-4569-8ea9-3b90dc2ed204',
    title: 'Familientag im Zoo',
    description: 'Ein bunter Tag für Groß und Klein...',
    priceList: 'Erwachsene: 12€, Kinder: 6€, Familienkarte: 30€',
    address: 'Zooallee 7, 44791 Bochum',
    location: { lat: 51.4818, lng: 7.2162 },
    category: [InterestEnum.Animals, InterestEnum.Nature],
    time: '10:00',
    date: '2025-09-15',
    age: 'Alle',
    image: ''
  }
];
