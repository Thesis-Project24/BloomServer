interface User {
  id: number;
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
    id ? : number
    email: string 
    first_name: string
    last_name: string
    specialty: string
    profile_picture: string
    phone_number: string
    address: string[]
    bio ? : string
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
  patientId: number;
  doctorId: number;
  appDetails?: string;
  appStatus?: string;
  appReview?: number;
  appFeedback?: string;
  slotId: number;
}



interface Slot {
  id: number;
  windowId: number;
  startingTime: dateTime
  endingTime: dateTime
}

interface ForumPost {
  id: number;
  content: string;
  upvote: number;
  downvote: number;
  authorId: number;
}

interface Comment {
  id: number;
  content: string;
  upvote: number;
  downvote: number;
  postId: number;
  userId: number;
  tagId: number;
}

interface Article {
  id: number;
  content: string;
  authorId: number;
}

interface Flair {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
  doctorId: number;
}

interface SaveArticle {
  id: number;
  articleId: number;
  userId: number;
}

interface MedSchedule {
  id: number;
  medId: number;
  userId: number;
  quantity: number;
  schedule: DateTime;
}

interface Habit {
  Id: number;
  name: string;
}

interface TrackHabit {
  id: number;

  habitId: number;
  userId: number;
  tracker: number[];
}

interface Window {
  id: number;
  doctorId: number;
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
  Group
};
