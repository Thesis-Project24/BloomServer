interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  phone_number: string;
  age: number;
  mood: number[];
}

interface Doctor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  specialty: string;
  profile_picture: string;
  phone_number: string;
  address: string[];
  bio?: string;
  rate?: number;
  review?:number;
  gender?:string;
}

interface Meds {
  id: number;
  name: string;
}

interface Journal {
  id: number;
}

interface Appointmenent {
  id?: number;
  patientId: string;
  doctorId: string;
  appDetails?: string;
  appStatus?: string;
  appReview?: number;
  appFeedback?: string;
  slotId: number;
}

interface Slot {
  id: number;
  windowId: number;
  startingTime: dateTime;
  endingTime: dateTime;
}

interface ForumPost {
  id: number;
  content: string;
  upvote: number;
  downvote: number;
  authorId: string;
}

interface Comment {
  id: number;
  content: string;
  upvote: number;
  downvote: number;
  postId: number;
  userId: string;
  tagId: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  authorId: string;
  picture_url: string;
  createdAt?: string;  
 
}

interface Flair {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
  doctorId: string;
}

interface SaveArticle {
  id: number;
  articleId: number;
  userId: string;
}

interface MedSchedule {
  id: number;
  medId: number;
  userId: string;
  quantity: number;
  schedule: DateTime[];
}

interface Habit {
  Id: number;
  name: string;
}

interface TrackHabit {
  id: number;

  habitId: number;
  userId: string;
  tracker: number[];
}

interface Window {
  id?: number;
  doctorId: string;
  startingTime: string;
  endingTime: string;
  duration: number;
  pause: number;
}

export {
  User,
  Doctor,
  Meds,
  MedSchedule,
  Appointmenent,
  Article,
  Journal,
  SaveArticle,
  Slot,
  Habit,
  TrackHabit,
  Window,
  Comment,
  Flair,
  forumPost,
  Group,
};
