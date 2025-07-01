import { EventDTO } from "../api/event/event.dto";
import { InterestEnum } from "../util/enums/interest.enum";
import { RatingEnum } from "../util/enums/rating.enum";

export const EventMockups: EventDTO[] = [
  {
    uuid: 'd5e8b021-13f3-40dc-b12f-8e101b3ec101',
    title: 'Open Air Konzert am See',
    description: `Erlebe ein unvergessliches Open-Air-Konzert direkt am idyllischen See in Herne! Junge Talente und lokale Bands bringen die Bühne zum Beben, während du auf Picknickdecken oder Liegestühlen entspannen kannst. Neben der Musik gibt es Essensstände, Mitmachaktionen, Fotospots und eine Chillout-Area – perfekt für Jugendliche, die Musik lieben und neue Leute kennenlernen wollen. Familienfreundlich und trotzdem cool – sichere dir deinen Platz!`,
    priceList: 'Eintritt: 15€, Kinder unter 12 kostenlos',
    address: 'Seepromenade 1, 44623 Herne',
    location: { lat: 51.531, lng: 7.2532 },
    category: [InterestEnum.Music, InterestEnum.Cooking],
    feedBack: [
      {
        userId: '9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121',
        userName: 'Anna Schmidt',
        rating: RatingEnum.Excellent,
        message: 'Wunderschöne Atmosphäre!'
      }
    ],
    time: '19:30',
    date: '2025-07-14',
    age: '13-17',
    image: ''
  },
  {
    uuid: 'a1f2e73d-6d2e-4d38-83ae-b34fc3d0928d',
    title: 'Tech Innovations 2025',
    description: `Willkommen zur Tech Innovations 2025 – der Messe für technikbegeisterte Jugendliche! Entdecke neue Gadgets, KI-Demos, Robotik und spannende Workshops von echten Start-ups. Du kannst VR-Brillen testen, eigene Mini-Roboter programmieren oder einfach coole Vorträge über Zukunftsthemen anhören. Das Event ist speziell für Jugendliche gedacht, die sich für Technik, Coding und neue Entwicklungen interessieren. Snacks, Lounge-Areas und Networking inklusive!`,
    priceList: 'Tagesticket: 49€, Studierende: 29€',
    address: 'Messezentrum, 44623 Herne',
    location: { lat: 51.5321, lng: 7.2458 },
    category: [InterestEnum.Technology, InterestEnum.Education],
    feedBack: [
      {
        userId: 'c26ae8b0-c9f0-4b66-bc3f-6ff2b83c2b4b',
        userName: 'Max Mustermann',
        rating: RatingEnum.Good,
        message: 'Tolle Vorträge, aber etwas voll.'
      }
    ],
    time: '10:00',
    date: '2025-08-05',
    age: '12-17',
    image: ''
  },
  {
    uuid: '27b88324-6815-42d1-892b-7551594e5f60',
    title: 'Kunst im Park',
    description: `Ein farbenfrohes Fest der Kreativität mitten im Grünen! Bei "Kunst im Park" kannst du dich in verschiedenen Kunst-Workshops ausprobieren: von Acrylmalerei über Street Art bis hin zu Tonfiguren. Professionelle Künstler:innen zeigen dir Tipps und Tricks und helfen dir bei deinen eigenen Werken. Dazu gibt’s Live-Musik, leckeres Essen und eine kleine Open-Air-Ausstellung. Perfekt für Kinder und Jugendliche, die ihrer Fantasie freien Lauf lassen wollen!`,
    priceList: 'Eintritt frei',
    address: 'Parkstraße, 44623 Herne',
    location: { lat: 51.5268, lng: 7.2123 },
    category: [InterestEnum.Painting, InterestEnum.Family],
    feedBack: [
      {
        userId: '7f90cbb5-b823-4564-9e5e-22a32fcd2187',
        userName: 'Tim Jansen',
        rating: RatingEnum.Good,
        message: 'Toller Tag mit kreativen Ideen!'
      }
    ],
    time: '11:00',
    date: '2025-06-21',
    age: '8-13',
    image: ''
  },
  {
    uuid: 'f4a726fb-24b4-4a07-ae2a-4710a412e1d9',
    title: 'Urban Sports Festival',
    description: `Bereit für Action? Beim Urban Sports Festival dreht sich alles um Bewegung, Mut und Adrenalin. Egal ob du Skaten, Parkour, BMX oder Streetball liebst – hier findest du deinen Platz. Coaches zeigen dir neue Tricks, du kannst an Mini-Turnieren teilnehmen oder einfach auf der Zuschauertribüne chillen. Außerdem gibt es Foodtrucks, Musik-DJs und eine Graffiti-Zone. Für alle sportlich Aktiven zwischen 11 und 16 Jahren – bring deine Crew mit und sei dabei!`,
    priceList: 'Tagespass: 10€, Wochenende: 18€',
    address: 'Sportgelände, 44623 Herne',
    location: { lat: 51.5405, lng: 7.2678 },
    category: [InterestEnum.Sports, InterestEnum.Music],
    feedBack: [
      {
        userId: '4b78ad21-91d1-4c4f-9b2d-527f531bd9d8',
        userName: 'Felix Bauer',
        rating: RatingEnum.Average,
        message: 'Cooles Konzept, aber zu wenig Sitzgelegenheiten.'
      }
    ],
    time: '12:00',
    date: '2025-07-10',
    age: '11-16',
    image: ''
  },
  {
    uuid: '2d143539-6c5c-4f3b-9828-1c59a5402a6b',
    title: 'Street Food Weekend',
    description: `Ein Wochenende voller Geschmacksexplosionen! Entdecke auf dem Street Food Weekend über 50 Stände mit Gerichten aus aller Welt – von mexikanischen Tacos über japanisches Street Sushi bis hin zu veganem Eis. Zusätzlich gibt es eine Chill-Zone für Jugendliche, kleine Kochworkshops zum Mitmachen und ein Bühnenprogramm mit DJ-Sets und Überraschungsgästen. Essen verbindet – komm vorbei und probiere dich durch die Weltküche mitten in Herne!`,
    priceList: 'Eintritt: 4€, inkl. 1 Getränk',
    address: 'Innenstadtplatz, 44623 Herne',
    location: { lat: 51.5233, lng: 7.2185 },
    category: [InterestEnum.Cooking],
    feedBack: [
      {
        userId: '05f76e11-9f5c-41e5-a6b4-b5a684db645c',
        userName: 'Jan Lange',
        rating: RatingEnum.Good,
        message: 'Super lecker, tolle Auswahl!'
      }
    ],
    time: '16:00',
    date: '2025-07-18',
    age: '10-15',
    image: ''
  },
  {
    uuid: '7bc042ab-d70c-4cb2-b0e2-f16c0b2df4df',
    title: 'Game Jam Junior 2025',
    description: `Tauche ein in die Welt der Videospielentwicklung! Beim Game Jam Junior entwickeln Jugendliche in kleinen Teams innerhalb von zwei Tagen ein eigenes Spiel – von der Idee bis zur Präsentation. Mit Unterstützung von Mentor:innen lernst du dabei Game Design, einfache Programmierung und Storytelling. Keine Vorkenntnisse nötig! Snacks, Musik und Preisverleihung inklusive.`,
    priceList: 'Teilnahme kostenlos, Anmeldung erforderlich',
    address: 'Kreativzentrum, 44623 Herne',
    location: { lat: 51.5301, lng: 7.2498 },
    category: [InterestEnum.Technology, InterestEnum.Education],
    feedBack: [
      {
        userId: '9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121',
        userName: 'Anna Schmidt',
        rating: RatingEnum.Excellent,
        message: 'Ein super Einstieg in Game-Entwicklung!'
      }
    ],
    time: '09:00',
    date: '2025-08-03',
    age: '12-16',
    image: ''
  },
  {
    uuid: '28a1e189-c4e9-46b2-bfde-460962a7a38f',
    title: 'Graffiti Workshop: Walls of Creativity',
    description: `Werde Teil unserer Street-Art-Community! In diesem Workshop zeigen professionelle Graffiti-Artists dir, wie du eigene Styles entwickelst, Sprühtechniken lernst und auf echten Wänden legale Kunstwerke schaffst. Gemeinsam gestalten wir eine Wand in Herne neu – mit deiner Message! Farben, Schutzkleidung und Drinks sind inklusive.`,
    priceList: 'Teilnahmegebühr: 5€, Material inklusive',
    address: 'Jugendzentrum Süd, 44623 Herne',
    location: { lat: 51.5244, lng: 7.2412 },
    category: [InterestEnum.Painting, InterestEnum.Education],
    feedBack: [
      {
        userId: '7f90cbb5-b823-4564-9e5e-22a32fcd2187',
        userName: 'Tim Jansen',
        rating: RatingEnum.Good,
        message: 'Cooler Workshop, alles gut erklärt!'
      }
    ],
    time: '14:00',
    date: '2025-07-28',
    age: '13-17',
    image: ''
  },
  {
    uuid: '96a3c6e4-63e7-4a71-980b-21b4e6f38d2d',
    title: 'Schnitzeljagd 2.0 – Die QR-Quest',
    description: `Erlebe Herne neu bei unserer digitalen Schnitzeljagd! In kleinen Teams löst ihr Rätsel per QR-Code, bewegt euch durch Parks, Straßen und spannende Locations. Jede Station bringt euch ein Stück näher zum Schatz. Die Jagd ist App-gestützt, macht Spaß und fordert eure Kreativität und Teamgeist!`,
    priceList: 'Kostenfrei, Smartphone erforderlich',
    address: 'Startpunkt: Rathausplatz Herne',
    location: { lat: 51.5389, lng: 7.2211 },
    category: [InterestEnum.Technology, InterestEnum.Sports],
    feedBack: [
      {
        userId: '4b78ad21-91d1-4c4f-9b2d-527f531bd9d8',
        userName: 'Felix Bauer',
        rating: RatingEnum.Excellent,
        message: 'Spannend, modern, richtig gut organisiert!'
      }
    ],
    time: '11:00',
    date: '2025-07-20',
    age: '10-14',
    image: ''
  },
  {
    uuid: 'cd3913b1-f912-4173-b1ff-d12d71e9c6f6',
    title: 'Dance & Beats – HipHop Moves für Teens',
    description: `Lust auf coole Moves, neue Beats und viel Energie? Dann ist unser HipHop-Workshop genau das Richtige! Unter Anleitung erfahrener Coaches lernst du Choreos, Technik und Style – alles zu aktuellen Tracks. Am Ende zeigen wir in einer Mini-Show, was du drauf hast. Spaß, Bewegung und Ausdruck stehen im Mittelpunkt.`,
    priceList: 'Workshopgebühr: 8€',
    address: 'Tanzstudio Herne West, 44623 Herne',
    location: { lat: 51.5333, lng: 7.2611 },
    category: [InterestEnum.Music, InterestEnum.Sports],
    feedBack: [
      {
        userId: '05f76e11-9f5c-41e5-a6b4-b5a684db645c',
        userName: 'Jan Lange',
        rating: RatingEnum.Good,
        message: 'Die Coaches waren super nett!'
      }
    ],
    time: '15:00',
    date: '2025-07-29',
    age: '12-17',
    image: ''
  },
  {
    uuid: '9c9f13f7-85c3-4f8c-91be-823bd10457cf',
    title: 'Pizza & Pasta Party – Kochen wie in Italien',
    description: `Lerne in lockerer Atmosphäre, wie du echte italienische Klassiker selbst zubereitest! Gemeinsam backen wir knusprige Pizzen, machen Pasta von Hand und bereiten frische Soßen zu. Der Workshop endet mit einem gemütlichen Abendessen mit selbst gemachten Gerichten, Musik und Spaß.`,
    priceList: 'Teilnahme: 6€, inkl. Essen & Getränke',
    address: 'Jugendhaus Eickel, 44651 Herne',
    location: { lat: 51.5259, lng: 7.1867 },
    category: [InterestEnum.Cooking, InterestEnum.Family],
    feedBack: [
      {
        userId: 'c26ae8b0-c9f0-4b66-bc3f-6ff2b83c2b4b',
        userName: 'Max Mustermann',
        rating: RatingEnum.Excellent,
        message: 'War super lecker und entspannt!'
      }
    ],
    time: '17:00',
    date: '2025-08-02',
    age: '8-13',
    image: ''
  }
];
