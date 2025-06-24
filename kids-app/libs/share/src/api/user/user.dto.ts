import { Logs } from "../../util/user.logs";
import { GenderEnum } from "../../util/enums/gender.enum";
import { InterestEnum } from "../../util/enums/interest.enum";
export class UserDTO {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
  address: string;
  friendIds: string[];
  eventHistoryIds: string[];
  bookedEventIds: string[];
  interests: InterestEnum[];
  logs: Logs[];

  constructor(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: GenderEnum,
    address: string,
    friendIds: string[],
    eventHistoryIds: string[],
    bookedEventIds: string[],
    interests: InterestEnum[],
    logs: Logs[]
  ) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.address = address;
    this.friendIds = friendIds;
    this.eventHistoryIds = eventHistoryIds;
    this.bookedEventIds = bookedEventIds;
    this.interests = interests;
    this.logs = logs;
  }
}
