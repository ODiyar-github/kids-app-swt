import { RatingEnum } from './enums/rating.enum';

export class AppFeedback {
  feedbackId: string;
  userId: string;
  rating: RatingEnum;
  comment: string;
  timestamp: string;

  constructor(
    feedbackId: string,
    userId: string,
    rating: RatingEnum,
    comment: string,
    timestamp: string,
  ) {
    this.feedbackId = feedbackId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
    this.timestamp = timestamp;
  }
}
