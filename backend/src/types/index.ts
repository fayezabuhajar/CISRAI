export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  affiliation: string;
  role: "participant" | "reviewer" | "speaker" | "committee" | "admin";
  registrationPlan?: "onsite-paper" | "online-paper" | "attendance";
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IParticipant extends Document {
  _id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  affiliation?: string;
  registrationType: "onsite-paper" | "online-paper" | "attendance";
  paperTitle?: string;
  paperFile?: string;
  paymentStatus: "pending" | "completed" | "cancelled";
  paymentMethod?: "bank-transfer" | "credit-card";
  transactionId?: string;
  registrationDate: Date;
  arrivalDate?: Date;
  departureDate?: Date;
  dietaryRequirements?: string;
  specialNeeds?: string;
  certificateGenerated: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewer extends Document {
  _id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  affiliation: string;
  expertise: string[];
  experience?: number;
  bio?: string;
  cv?: string;
  status: "pending" | "approved" | "rejected";
  approvedDate?: Date;
  rejectedReason?: string;
  paperAssignments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpeaker extends Document {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  keynote: {
    en: string;
    ar: string;
  };
  affiliation: {
    en: string;
    ar: string;
  };
  bio?: {
    en: string;
    ar: string;
  };
  email?: string;
  phone?: string;
  photo?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  order: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommittee extends Document {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  committee: "scientific" | "preparatory" | "media" | "technical";
  title: {
    en: string;
    ar: string;
  };
  affiliation?: {
    en: string;
    ar: string;
  };
  email?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaper extends Document {
  _id: string;
  title: string;
  abstract: string;
  keywords: string[];
  authors: {
    name: string;
    email: string;
    affiliation: string;
  }[];
  submissionDate: Date;
  file: string;
  status: "submitted" | "under-review" | "accepted" | "rejected";
  reviewScore?: number;
  reviews: string[];
  acceptanceDate?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage extends Document {
  _id: string;
  senderName: string;
  senderEmail: string;
  phone: string;
  subject: string;
  message: string;
  attachments?: string[];
  status: "unread" | "read" | "replied";
  response?: string;
  respondedBy?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISchedule extends Document {
  _id: string;
  eventTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  speaker?: string;
  room?: string;
  eventType: "keynote" | "session" | "break" | "social" | "workshop";
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnnouncementDocument extends Document {
  _id: string;
  title: string;
  content: string;
  type: "news" | "update" | "warning" | "reminder";
  priority: "low" | "medium" | "high";
  targetAudience: "all" | "participants" | "reviewers" | "speakers";
  publishedDate: Date;
  expiryDate?: Date;
  isPublished: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdmin extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "super-admin" | "admin" | "moderator";
  permissions: string[];
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJWTPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code?: number;
}
