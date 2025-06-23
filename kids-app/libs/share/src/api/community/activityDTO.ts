export interface ActivityDTO {
    friendId: string;
    friendName: string;
    action: 'JOINED_EVENT' | 'LEFT_EVENT' | 'CREATED_EVENT';
    eventId: string;
    eventName: string;
    timestamp: string;
  }