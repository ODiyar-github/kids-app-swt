import { EventDTO, Appointment, EventFeedBackDto, WeatherForecast, Point } from "../api/event/event.dto";
import { InterestEnum } from "../util/enums/interest.enum";
import { RatingEnum } from "../util/enums/rating.enum";

export const EventMockups: EventDTO[] = [
  {
    uuid: 'd5e8b021-13f3-40dc-b12f-8e101b3ec101',
    title: 'Open Air Konzert am See',
    description: `Erlebe ein unvergessliches Open-Air-Konzert direkt am idyllischen See in Herne! Junge Talente und lokale Bands bringen die Bühne zum Beben, während du auf Picknickdecken oder Liegestühlen entspannen kannst. Neben der Musik gibt es Essensstände, Mitmachaktionen, Fotospots und eine Chillout-Area – perfekt für Jugendliche, die Musik lieben und neue Leute kennenlernen wollen. Familienfreundlich und trotzdem cool – sichere dir deinen Platz!`,
    priceList: '15-Jährige: 7,50€, 16-Jährige: 8,00€, 17-Jährige: 9,00€, Erwachsene: 10,00€',
    address: 'Seepromenade 1, 44623 Herne',
    location: new Point(51.531, 7.2532),
    weatherForecast: [
      new WeatherForecast('Montag', 'wb_sunny', 20, 32),
      new WeatherForecast('Dienstag', 'wb_sunny', 22, 28),
      new WeatherForecast('Mittwoch', 'bolt', 23, 30),
      new WeatherForecast('Donnerstag', 'cloud', 18, 24),
      new WeatherForecast('Freitag', 'cloud', 17, 21),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 26),
      new WeatherForecast('Sonntag', 'wb_sunny', 21, 30),
    ],
    category: [InterestEnum.Music, InterestEnum.Cooking],
    feedBack: [
      new EventFeedBackDto(
        '9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121',
        'Anna Schmidt',
        RatingEnum.Excellent,
        'Wunderschöne Atmosphäre!'
      )
    ],
    appointments: [
      new Appointment('2025-07-14', '19:30')
    ],
    date: '2025-07-14',
    time: '19:30',
    age: '15-17',
    image: '',
    organization: 'Herne Events GmbH',
    author: 'Lena Mustermann'
  },
  {
    uuid: 'a1f2e73d-6d2e-4d38-83ae-b34fc3d0928d',
    title: 'Tech Innovations 2025',
    description: `Willkommen zur Tech Innovations 2025 – der Messe für technikbegeisterte Jugendliche! Entdecke neue Gadgets, KI-Demos, Robotik und spannende Workshops von echten Start-ups. Du kannst VR-Brillen testen, eigene Mini-Roboter programmieren oder einfach coole Vorträge über Zukunftsthemen anhören. Das Event ist speziell für Jugendliche gedacht, die sich für Technik, Coding und neue Entwicklungen interessieren. Snacks, Lounge-Areas und Networking inklusive!`,
    priceList: '12- bis 13-Jährige: 5,00€, 14- bis 16-Jährige: 6,50€, 17-Jährige: 7,50€, Erwachsene: 10,00€',
    address: 'Messezentrum, 44623 Herne',
    location: new Point(51.5321, 7.2458),
    weatherForecast: [
      new WeatherForecast('Montag', 'cloudy', 18, 26),
      new WeatherForecast('Dienstag', 'thunderstorm', 20, 28),
      new WeatherForecast('Mittwoch', 'foggy', 15, 22),
      new WeatherForecast('Donnerstag', 'cloud', 14, 20),
      new WeatherForecast('Freitag', 'cloud', 16, 19),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 25),
      new WeatherForecast('Sonntag', 'cloud', 12, 18),
    ],
    category: [InterestEnum.Technology, InterestEnum.Education],
    feedBack: [
      new EventFeedBackDto(
        'c26ae8b0-c9f0-4b66-bc3f-6ff2b83c2b4b',
        'Max Mustermann',
        RatingEnum.Good,
        'Tolle Vorträge, aber etwas voll.'
      )
    ],
    appointments: [
      new Appointment('2025-08-05', '10:00')
    ],
    date: '2025-08-05',
    time: '10:00',
    age: '12-17',
    image: '',
    organization: 'Innovation Hub Herne',
    author: 'Tim Schneider'
  },
  {
    uuid: '27b88324-6815-42d1-892b-7551594e5f60',
    title: 'Kunst im Park',
    description: `Ein farbenfrohes Fest der Kreativität mitten im Grünen! Bei "Kunst im Park" kannst du dich in verschiedenen Kunst-Workshops ausprobieren: von Acrylmalerei über Street Art bis hin zu Tonfiguren. Professionelle Künstler:innen zeigen dir Tipps und Tricks und helfen dir bei deinen eigenen Werken. Dazu gibt’s Live-Musik, leckeres Essen und eine kleine Open-Air-Ausstellung. Perfekt für Kinder und Jugendliche, die ihrer Fantasie freien Lauf lassen wollen!`,
    priceList: 'Für Kinder und Eltern Kostenlos',
    address: 'Parkstraße, 44623 Herne',
    location: new Point(51.5268, 7.2123),
    weatherForecast: [
      new WeatherForecast('Montag', 'wb_sunny', 20, 32),
      new WeatherForecast('Dienstag', 'wb_sunny', 22, 28),
      new WeatherForecast('Mittwoch', 'bolt', 23, 30),
      new WeatherForecast('Donnerstag', 'cloud', 18, 24),
      new WeatherForecast('Freitag', 'cloud', 17, 21),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 26),
      new WeatherForecast('Sonntag', 'wb_sunny', 21, 30),
    ],
    category: [InterestEnum.Painting, InterestEnum.Family],
    feedBack: [
      new EventFeedBackDto(
        '7f90cbb5-b823-4564-9e5e-22a32fcd2187',
        'Tim Jansen',
        RatingEnum.Good,
        'Toller Tag mit kreativen Ideen!'
      )
    ],
    appointments: [
      new Appointment('2025-06-21', '11:00')
    ],
    date: '2025-06-21',
    time: '11:00',
    age: '8-13',
    image: '',
    organization: 'Kulturamt Herne',
    author: 'Sabine Müller'
  },
  {
    uuid: 'f4a726fb-24b4-4a07-ae2a-4710a412e1d9',
    title: 'Urban Sports Festival',
    description: `Bereit für Action? Beim Urban Sports Festival dreht sich alles um Bewegung, Mut und Adrenalin. Egal ob du Skaten, Parkour, BMX oder Streetball liebst – hier findest du deinen Platz. Coaches zeigen dir neue Tricks, du kannst an Mini-Turnieren teilnehmen oder einfach auf der Zuschauertribüne chillen. Außerdem gibt es Foodtrucks, Musik-DJs und eine Graffiti-Zone. Für alle sportlich Aktiven zwischen 11 und 16 Jahren – bring deine Crew mit und sei dabei!`,
    priceList: '11- bis 13-Jährige: 3,00€, 14- bis 15-Jährige: 4,50€, 16-Jährige: 5,50€, Erwachsene: 8,00€',
    address: 'Sportgelände, 44623 Herne',
    location: new Point(51.5405, 7.2678),
    weatherForecast: [
      new WeatherForecast('Montag', 'cloudy', 18, 26),
      new WeatherForecast('Dienstag', 'thunderstorm', 20, 28),
      new WeatherForecast('Mittwoch', 'foggy', 15, 22),
      new WeatherForecast('Donnerstag', 'cloud', 14, 20),
      new WeatherForecast('Freitag', 'cloud', 16, 19),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 25),
      new WeatherForecast('Sonntag', 'cloud', 12, 18),
    ],
    category: [InterestEnum.Sports, InterestEnum.Music],
    feedBack: [
      new EventFeedBackDto(
        '4b78ad21-91d1-4c4f-9b2d-527f531bd9d8',
        'Felix Bauer',
        RatingEnum.Average,
        'Cooles Konzept, aber zu wenig Sitzgelegenheiten.'
      )
    ],
    appointments: [
      new Appointment('2025-07-10', '12:00')
    ],
    date: '2025-07-10',
    time: '12:00',
    age: '11-16',
    image: '',
    organization: 'Sportverein Herne e.V.',
    author: 'Daniel Richter'
  },
  {
    uuid: '2d143539-6c5c-4f3b-9828-1c59a5402a6b',
    title: 'Street Food Weekend',
    description: `Ein Wochenende voller Geschmacksexplosionen! Entdecke auf dem Street Food Weekend über 50 Stände mit Gerichten aus aller Welt – von mexikanischen Tacos über japanisches Street Sushi bis hin zu veganem Eis. Zusätzlich gibt es eine Chill-Zone für Jugendliche, kleine Kochworkshops zum Mitmachen und ein Bühnenprogramm mit DJ-Sets und Überraschungsgästen. Essen verbindet – komm vorbei und probiere dich durch die Weltküche mitten in Herne!`,
    priceList: '10- bis 11-Jährige: 5,00€, 12- bis 14-Jährige: 6,50€, 15-Jährige: 7,50€, Erwachsene: 10,00€',
    address: 'Innenstadtplatz, 44623 Herne',
    location: new Point(51.5233, 7.2185),
    weatherForecast: [
      new WeatherForecast('Montag', 'wb_sunny', 20, 32),
      new WeatherForecast('Dienstag', 'wb_sunny', 22, 28),
      new WeatherForecast('Mittwoch', 'bolt', 23, 30),
      new WeatherForecast('Donnerstag', 'cloud', 18, 24),
      new WeatherForecast('Freitag', 'cloud', 17, 21),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 26),
      new WeatherForecast('Sonntag', 'wb_sunny', 21, 30),
    ],
    category: [InterestEnum.Cooking],
    feedBack: [
      new EventFeedBackDto(
        '05f76e11-9f5c-41e5-a6b4-b5a684db645c',
        'Jan Lange',
        RatingEnum.Good,
        'Super lecker, tolle Auswahl!'
      )
    ],
    appointments: [
      new Appointment('2025-07-18', '16:00')
    ],
    date: '2025-07-18',
    time: '16:00',
    age: '10-15',
    image: '',
    organization: 'Food Truck Events',
    author: 'Sophie Weber'
  },
  {
    uuid: '7bc042ab-d70c-4cb2-b0e2-f16c0b2df4df',
    title: 'Game Jam Junior 2025',
    description: `Tauche ein in die Welt der Videospielentwicklung! Beim Game Jam Junior entwickeln Jugendliche in kleinen Teams innerhalb von zwei Tagen ein eigenes Spiel – von der Idee bis zur Präsentation. Mit Unterstützung von Mentor:innen lernst du dabei Game Design, einfache Programmierung und Storytelling. Keine Vorkenntnisse nötig! Snacks, Musik und Preisverleihung inklusive.`,
    priceList: '12- bis 14-Jährige: 5,00€, 15-Jährige: 6,50€, 16-Jährige: 7,50€, Erwachsene: 10,00€',
    address: 'Kreativzentrum, 44623 Herne',
    location: new Point(51.5301, 7.2498),
    weatherForecast: [
      new WeatherForecast('Montag', 'cloudy', 18, 26),
      new WeatherForecast('Dienstag', 'thunderstorm', 20, 28),
      new WeatherForecast('Mittwoch', 'foggy', 15, 22),
      new WeatherForecast('Donnerstag', 'cloud', 14, 20),
      new WeatherForecast('Freitag', 'cloud', 16, 19),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 25),
      new WeatherForecast('Sonntag', 'cloud', 12, 18),
    ],
    category: [InterestEnum.Technology, InterestEnum.Education],
    feedBack: [
      new EventFeedBackDto(
        '9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121',
        'Anna Schmidt',
        RatingEnum.Excellent,
        'Ein super Einstieg in Game-Entwicklung!'
      )
    ],
    appointments: [
      new Appointment('2025-08-03', '09:00')
    ],
    date: '2025-08-03',
    time: '09:00',
    age: '12-16',
    image: '',
    organization: 'Jugend Code Academy',
    author: 'Laura Fischer'
  },
  {
    uuid: '28a1e189-c4e9-46b2-bfde-460962a7a38f',
    title: 'Graffiti Workshop: Walls of Creativity',
    description: `Werde Teil unserer Street-Art-Community! In diesem Workshop zeigen professionelle Graffiti-Artists dir, wie du eigene Styles entwickelst, Sprühtechniken lernst und auf echten Wänden legale Kunstwerke schaffst. Gemeinsam gestalten wir eine Wand in Herne neu – mit deiner Message! Farben, Schutzkleidung und Drinks sind inklusive.`,
    priceList: '13- bis 14-Jährige: 5,00€, 15-Jährige: 6,50€, 17-Jährige: 7,50€, Erwachsene: 10,00€',
    address: 'Jugendzentrum Süd, 44623 Herne',
    location: new Point(51.5244, 7.2412),
    weatherForecast: [
      new WeatherForecast('Montag', 'wb_sunny', 20, 32),
      new WeatherForecast('Dienstag', 'wb_sunny', 22, 28),
      new WeatherForecast('Mittwoch', 'bolt', 23, 30),
      new WeatherForecast('Donnerstag', 'cloud', 18, 24),
      new WeatherForecast('Freitag', 'cloud', 17, 21),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 26),
      new WeatherForecast('Sonntag', 'wb_sunny', 21, 30),
    ],
    category: [InterestEnum.Painting, InterestEnum.Education],
    feedBack: [
      new EventFeedBackDto(
        '7f90cbb5-b823-4564-9e5e-22a32fcd2187',
        'Tim Jansen',
        RatingEnum.Good,
        'Cooler Workshop, alles gut erklärt!'
      )
    ],
    appointments: [
      new Appointment('2025-07-28', '14:00')
    ],
    date: '2025-07-28',
    time: '14:00',
    age: '13-17',
    image: '',
    organization: 'Street Art Collective',
    author: 'Michael Kurz'
  },
  {
    uuid: '96a3c6e4-63e7-4a71-980b-21b4e6f38d2d',
    title: 'Schnitzeljagd 2.0 – Die QR-Quest',
    description: `Erlebe Herne neu bei unserer digitalen Schnitzeljagd! In kleinen Teams löst ihr Rätsel per QR-Code, bewegt euch durch Parks, Straßen und spannende Locations. Jede Station bringt euch ein Stück näher zum Schatz. Die Jagd ist App-gestützt, macht Spaß und fordert eure Kreativität und Teamgeist!`,
    priceList: 'Für Kinder und Eltern Kostenlos',
    address: 'Startpunkt: Rathausplatz Herne',
    location: new Point(51.5389, 7.2211),
    weatherForecast: [
      new WeatherForecast('Montag', 'cloudy', 18, 26),
      new WeatherForecast('Dienstag', 'thunderstorm', 20, 28),
      new WeatherForecast('Mittwoch', 'foggy', 15, 22),
      new WeatherForecast('Donnerstag', 'cloud', 14, 20),
      new WeatherForecast('Freitag', 'cloud', 16, 19),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 25),
      new WeatherForecast('Sonntag', 'cloud', 12, 18),
    ],
    category: [InterestEnum.Technology, InterestEnum.Sports],
    feedBack: [
      new EventFeedBackDto(
        '4b78ad21-91d1-4c4f-9b2d-527f531bd9d8',
        'Felix Bauer',
        RatingEnum.Excellent,
        'Spannend, modern, richtig gut organisiert!'
      )
    ],
    appointments: [
      new Appointment('2025-07-20', '11:00')
    ],
    date: '2025-07-20',
    time: '11:00',
    age: '10-14',
    image: '',
    organization: 'Stadterkundungen Herne',
    author: 'Patrick Klein'
  },
  {
    uuid: 'cd3913b1-f912-4173-b1ff-d12d71e9c6f6',
    title: 'Dance & Beats – HipHop Moves für Teens',
    description: `Lust auf coole Moves, neue Beats und viel Energie? Dann ist unser HipHop-Workshop genau das Richtige! Unter Anleitung erfahrener Coaches lernst du Choreos, Technik und Style – alles zu aktuellen Tracks. Am Ende zeigen wir in einer Mini-Show, was du drauf hast. Spaß, Bewegung und Ausdruck stehen im Mittelpunkt.`,
    priceList: '12- bis 14-Jährige: 5,00€, 15-Jährige: 6,50€, 17-Jährige: 7,50€, Erwachsene: 10,00€',
    address: 'Tanzstudio Herne West, 44623 Herne',
    location: new Point(51.5333, 7.2611),
    weatherForecast: [
      new WeatherForecast('Montag', 'wb_sunny', 20, 32),
      new WeatherForecast('Dienstag', 'wb_sunny', 22, 28),
      new WeatherForecast('Mittwoch', 'bolt', 23, 30),
      new WeatherForecast('Donnerstag', 'cloud', 18, 24),
      new WeatherForecast('Freitag', 'cloud', 17, 21),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 26),
      new WeatherForecast('Sonntag', 'wb_sunny', 21, 30),
    ],
    category: [InterestEnum.Music, InterestEnum.Sports],
    feedBack: [
      new EventFeedBackDto(
        '05f76e11-9f5c-41e5-a6b4-b5a684db645c',
        'Jan Lange',
        RatingEnum.Good,
        'Die Coaches waren super nett!'
      )
    ],
    appointments: [
      new Appointment('2025-07-29', '15:00')
    ],
    date: '2025-07-29',
    time: '15:00',
    age: '12-17',
    image: '',
    organization: 'Urban Dance Studio',
    author: 'Julia Berger'
  },
  {
    uuid: '9c9f13f7-85c3-4f8c-91be-823bd10457cf',
    title: 'Pizza & Pasta Party – Kochen wie in Italien',
    description: `Lerne in lockerer Atmosphäre, wie du echte italienische Klassiker selbst zubereitest! Gemeinsam backen wir knusprige Pizzen, machen Pasta von Hand und bereiten frische Soßen zu. Der Workshop endet mit einem gemütlichen Abendessen mit selbst gemachten Gerichten, Musik und Spaß.`,
    priceList: '8- und 9-Jährige: 5,00€, 10-Jährige: 6,50€, 13-Jährige: 7,50€, Erwachsene: 10,00€',
    address: 'Jugendhaus Eickel, 44651 Herne',
    location: new Point(51.5259, 7.1867),
    weatherForecast: [
      new WeatherForecast('Montag', 'cloudy', 18, 26),
      new WeatherForecast('Dienstag', 'thunderstorm', 20, 28),
      new WeatherForecast('Mittwoch', 'foggy', 15, 22),
      new WeatherForecast('Donnerstag', 'cloud', 14, 20),
      new WeatherForecast('Freitag', 'cloud', 16, 19),
      new WeatherForecast('Samstag', 'wb_sunny', 19, 25),
      new WeatherForecast('Sonntag', 'cloud', 12, 18),
    ],
    category: [InterestEnum.Cooking, InterestEnum.Family],
    feedBack: [
      new EventFeedBackDto(
        'c26ae8b0-c9f0-4b66-bc3f-6ff2b83c2b4b',
        'Max Mustermann',
        RatingEnum.Excellent,
        'War super lecker und entspannt!'
      )
    ],
    appointments: [
      new Appointment('2025-08-02', '17:00')
    ],
    date: '2025-08-02',
    time: '17:00',
    age: '8-13',
    image: '',
    organization: 'Jugendförderung Herne',
    author: 'Lena Koch'
  }
];