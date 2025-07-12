import { UserDTO } from '../api/user/user.dto';
import { InterestEnum } from '../util/enums/interest.enum';
import { Logs } from '../util/user.logs';
import { GenderEnum } from '../util/enums/gender.enum';
import { AuthLoginDTO } from '../api/user/auth.login.dto';

/**
 * @constant UserMockups
 * @description Ein Array von AuthLoginDTO-Objekten, das als Mock-Daten für Benutzeranmeldungen dient.
 * Jedes Objekt repräsentiert einen simulierten Benutzer mit Anmeldeinformationen und
 * detaillierten Benutzerprofilinformationen (UserDTO). Diese Daten werden zu Test- und
 * Entwicklungszwecken verwendet, um Benutzerdaten und deren Interaktionen zu simulieren.
 *
 * @type {AuthLoginDTO[]}
 */
export const UserMockups: AuthLoginDTO[] = [
  new AuthLoginDTO(
    "anna.schmidt@example.com", 
    "password123", 
    new UserDTO(
      "9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121",
      "anna.schmidt@example.com",
      "Anna",
      "Schmidt",
      28,
      GenderEnum.Female,
      "Musterstraße 1, 12345 Berlin",
      [ "c26ae8b0-c9f0-4b66-bc3f-6ff2b83c2b4b", "5c3bc4be-6c6a-4e56-92b8-14f63f92d69a" ],
      [ "d5e8b021-13f3-40dc-b12f-8e101b3ec101", "27b88324-6815-42d1-892b-7551594e5f60" ],
      [ "2d143539-6c5c-4f3b-9828-1c59a5402a6b" ],
      [InterestEnum.Music, InterestEnum.Traveling, InterestEnum.Cooking],
      [
        new Logs('Anna Schmidt', new Date("2025-06-01").toISOString(), "d5e8b021-13f3-40dc-b12f-8e101b3ec101", "Teilnahme am Open Air Konzert"),
        new Logs('Anna Schmidt', new Date("2025-06-10").toISOString(), "2d143539-6c5c-4f3b-9828-1c59a5402a6b", "Street Food Ticket gebucht")
      ],
    )
  ),
  new AuthLoginDTO(
    "max.mustermann@example.com",
    "password123",
    new UserDTO(
      "c26ae8b0-c9f0-4b66-bc3f-6ff2b83c2b4b",
      "max.mustermann@example.com",
      "Max",
      "Mustermann",
      35,
      GenderEnum.Male,
      "Beispielweg 10, 54321 Hamburg",
      ["9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121","7f90cbb5-b823-4564-9e5e-22a32fcd2187","05f76e11-9f5c-41e5-a6b4-b5a684db645c",],
      [ "14d94aa2-3b4e-4d6a-890e-25df6dcdd0d5" ],
      [ "a1f2e73d-6d2e-4d38-83ae-b34fc3d0928d", "f4a726fb-24b4-4a07-ae2a-4710a412e1d9" ],
      [InterestEnum.Sports, InterestEnum.Gaming, InterestEnum.Programming, InterestEnum.Art, InterestEnum.Cooking],
      [
        new Logs('Max Mustermann', new Date("2025-06-15").toISOString(), "14d94aa2-3b4e-4d6a-890e-25df6dcdd0d5", "Bootcamp erfolgreich abgeschlossen")
      ],
    )
  ),
  new AuthLoginDTO(
    "lena.mueller@example.com",
    "password123",
    new UserDTO(
      "5c3bc4be-6c6a-4e56-92b8-14f63f92d69a",
      "lena.mueller@example.com",
      "Lena",
      "Müller",
      22,
      GenderEnum.Female,
      "Hauptstraße 5, 67890 München",
      ["9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121"],
      [ "3c45a0f4-fd93-4569-8ea9-3b90dc2ed204", "57e0876c-b9e7-4c60-b2e5-8ef5d8cf0c69" ],
      [],
      [InterestEnum.Reading, InterestEnum.Yoga, InterestEnum.Photography],
      [],
    )
  ),
  new AuthLoginDTO(
    "tim.jansen@example.com",
    "password123",
    new UserDTO(
      "7f90cbb5-b823-4564-9e5e-22a32fcd2187",
      "tim.jansen@example.com",
      "Tim",
      "Jansen",
      31,
      GenderEnum.Male,
      "Feldstraße 8, 50667 Köln",
      [],
      ["27b88324-6815-42d1-892b-7551594e5f60"],
      [],
      [InterestEnum.Art, InterestEnum.Music],
      [new Logs('Tim Jansen', new Date("2025-05-21").toISOString(), "27b88324-6815-42d1-892b-7551594e5f60", "Besuchte Kunstausstellung im Park")],
    )
  ),
  new AuthLoginDTO(
    "sophie.keller@example.com",
    "password123",
    new UserDTO(
      "d91e4ab8-4bd2-4e03-bc4a-8ddf46ce12b1",
      "sophie.keller@example.com",
      "Sophie",
      "Keller",
      29,
      GenderEnum.Female,
      "Parkallee 12, 28195 Bremen",
      [],
      ["14d94aa2-3b4e-4d6a-890e-25df6dcdd0d5"],
      [],
      [InterestEnum.Programming, InterestEnum.Gaming, InterestEnum.Traveling],
      [],
    )
  ),
  new AuthLoginDTO(
    "jan.lange@example.com",
    "password123",
    new UserDTO(
      "05f76e11-9f5c-41e5-a6b4-b5a684db645c",
      "jan.lange@example.com",
      "Jan",
      "Lange",
      40,
      GenderEnum.Male,
      "Elbchaussee 99, 22763 Hamburg",
      [],
      ["2d143539-6c5c-4f3b-9828-1c59a5402a6b"],
      [],
      [InterestEnum.Cooking, InterestEnum.Traveling, InterestEnum.Hiking],
      [new Logs('Jan Lange',new Date("2025-06-03").toISOString(), "2d143539-6c5c-4f3b-9828-1c59a5402a6b", "Teilnahme am Street Food Event")],
    )
  ),
  new AuthLoginDTO(
    "nina.schwarz@example.com",
    "password123",
    new UserDTO(
      "ebac3a3c-d3a7-4aaf-a4d2-c64db31de4d3",
      "nina.schwarz@example.com",
      "Nina",
      "Schwarz",
      24,
      GenderEnum.Female,
      "Waldstraße 3, 01067 Dresden",
      [],
      [],
      [],
      [InterestEnum.Yoga, InterestEnum.Music, InterestEnum.Movies],
      [],
    )
  ),
  new AuthLoginDTO(
    "felix.bauer@example.com",
    "password123",
    new UserDTO(
      "4b78ad21-91d1-4c4f-9b2d-527f531bd9d8",
      "felix.bauer@example.com",
      "Felix",
      "Bauer",
      33,
      GenderEnum.Male,
      "Bahnhofstraße 7, 90402 Nürnberg",
      [],
      ["f4a726fb-24b4-4a07-ae2a-4710a412e1d9"],
      [],
      [InterestEnum.Sports, InterestEnum.Traveling],
      [new Logs('Felix Bauer', new Date("2025-06-19").toISOString(), "f4a726fb-24b4-4a07-ae2a-4710a412e1d9", "Teilnahme am Sportfestival")],
    )
  ),
  new AuthLoginDTO(
    "julia.berg@example.com",
    "password123",
    new UserDTO(
      "a4a9cbcb-44d3-4ef7-a779-6fe0414c12c0",
      "julia.berg@example.com",
      "Julia",
      "Berg",
      30,
      GenderEnum.Female,
      "Ringstraße 20, 70173 Stuttgart",
      [],
      ["57e0876c-b9e7-4c60-b2e5-8ef5d8cf0c69"],
      [],
      [InterestEnum.Traveling, InterestEnum.Reading],
      [new Logs('Julia Berg', new Date("2025-06-08").toISOString(), "57e0876c-b9e7-4c60-b2e5-8ef5d8cf0c69", "Reisevortrag besucht")],
    )
  ),
  new AuthLoginDTO(
    "lukas.maier@example.com",
    "password123",
    new UserDTO(
      "cfd2b580-4c53-4b5c-b90a-3b0b2345f6a0",
      "lukas.maier@example.com",
      "Lukas",
      "Maier",
      26,
      GenderEnum.Male,
      "Alte Gasse 18, 86150 Augsburg",
      [],
      [],
      [],
      [InterestEnum.Gaming, InterestEnum.Programming],
      [],
    )
  )
];
