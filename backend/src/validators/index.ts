import { body, param, query, ValidationChain } from "express-validator";

// Auth Validators
export const registerValidator = (): ValidationChain[] => [
  body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("firstName").trim().notEmpty(),
  body("lastName").trim().notEmpty(),
];

export const loginValidator = (): ValidationChain[] => [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
];

// Participant Validators
export const createParticipantValidator = (): ValidationChain[] => [
  body("fullName").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("phone").isMobilePhone("any"),
  body("country").notEmpty(),
  body("registrationType").isIn(["onsite-paper", "online-paper", "attendance"]),
];

export const updateParticipantValidator = (): ValidationChain[] => [
  body("fullName").optional().trim().notEmpty(),
  body("phone").optional().isMobilePhone("any"),
  body("dietaryRequirements").optional().trim(),
];

// Reviewer Validators
export const createReviewerValidator = (): ValidationChain[] => [
  body("fullName").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("phone").isMobilePhone("any"),
  body("affiliation").trim().notEmpty(),
  body("expertise").isArray(),
  body("experience").isInt({ min: 0 }),
  body("bio").trim().notEmpty(),
];

// Speaker Validators
export const createSpeakerValidator = (): ValidationChain[] => [
  body("firstName").trim().notEmpty(),
  body("lastName").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("phone").isMobilePhone("any"),
  body("affiliation").trim().notEmpty(),
  body("title").trim().notEmpty(),
  body("bio").trim().notEmpty(),
  body("presentationTopic").trim().notEmpty(),
  body("presentationDuration").isInt({ min: 1 }),
];

// Paper Validators
export const submitPaperValidator = (): ValidationChain[] => [
  body("title").trim().notEmpty(),
  body("abstract").trim().notEmpty(),
  body("keywords").isArray(),
  body("authors").isArray(),
];

// Message Validators
export const submitMessageValidator = (): ValidationChain[] => [
  body("senderName").trim().notEmpty(),
  body("senderEmail").isEmail().normalizeEmail(),
  body("subject").trim().notEmpty(),
  body("message").trim().notEmpty(),
];

// Schedule Validators
export const createScheduleValidator = (): ValidationChain[] => [
  body("eventTitle").trim().notEmpty(),
  body("startDate").isISO8601(),
  body("endDate").isISO8601(),
  body("location").trim().notEmpty(),
  body("eventType").isIn(["keynote", "session", "break", "social", "workshop"]),
];

// ID Validators
export const idValidator = () => [param("id").isMongoId()];

// Query Validators
export const paginationValidator = (): ValidationChain[] => [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];
