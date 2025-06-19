import { InterestEnum } from "../enums/interest.enum";
import { UserDTO } from "../user/user.dto";

export const UserMockups: UserDTO[] = [
    new UserDTO(
      "1",
      "anna.schmidt@example.com",
      "Anna",
      "Schmidt",
      28,
      "female",
      "Musterstraße 1, 12345 Berlin",
      ["2", "3"],
      ["101", "102"],
      ["201"],
      [InterestEnum.Music, InterestEnum.Traveling, InterestEnum.Cooking]
    ),
    new UserDTO(
      "2",
      "max.mustermann@example.com",
      "Max",
      "Mustermann",
      35,
      "male",
      "Beispielweg 10, 54321 Hamburg",
      ["1"],
      ["103"],
      ["202", "203"],
      [InterestEnum.Sports, InterestEnum.Gaming, InterestEnum.Programming]
    ),
    new UserDTO(
      "3",
      "lena.mueller@example.com",
      "Lena",
      "Müller",
      22,
      "female",
      "Hauptstraße 5, 67890 München",
      ["1"],
      ["104", "105"],
      [],
      [InterestEnum.Reading, InterestEnum.Yoga, InterestEnum.Photography]
    ),
  ];