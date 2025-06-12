export class UserDTO {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  address: string;
  friendIds: string[];
  eventHistoryIds: string[];
  bookedEventIds: string[];
  interests: string[];

  constructor(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    address: string,
    friendIds: string[],
    eventHistoryIds: string[],
    bookedEventIds: string[],
    interests: string[]
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
  }
}
