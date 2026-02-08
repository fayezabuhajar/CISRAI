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
  body("phone").isMobilePhone("any", { strictMode: false }),
  body("registrationType").isIn(["onsite-paper", "online-paper", "attendance"]),
];

export const updateParticipantValidator = (): ValidationChain[] => [
  body("fullName").optional().trim().notEmpty(),
  body("phone").optional().isMobilePhone("any", { strictMode: false }),
  body("dietaryRequirements").optional().trim(),
];

// Reviewer Validators
export const createReviewerValidator = (): ValidationChain[] => [
  body("fullName").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("affiliation").trim().notEmpty(),
  body("expertise").isArray({ min: 1 }),
  body("cv").optional().isString(),
];

// Speaker Validators
export const createSpeakerValidator = (): ValidationChain[] => [
  body("name.en").trim().notEmpty(),
  body("name.ar").trim().notEmpty(),
  body("role.en").trim().notEmpty(),
  body("role.ar").trim().notEmpty(),
  body("title.en").trim().notEmpty(),
  body("title.ar").trim().notEmpty(),
  body("keynote.en").trim().notEmpty(),
  body("keynote.ar").trim().notEmpty(),
  body("affiliation.en").optional().trim(),
  body("affiliation.ar").optional().trim(),
  body("bio.en").optional().trim(),
  body("bio.ar").optional().trim(),
  body("email").optional().isEmail().normalizeEmail(),
  body("phone").optional().isMobilePhone("any", { strictMode: false }),
  body("order").optional().isInt({ min: 0 }),
];

export const updateSpeakerValidator = (): ValidationChain[] => [
  body("name.en").optional().trim().notEmpty(),
  body("name.ar").optional().trim().notEmpty(),
  body("role.en").optional().trim().notEmpty(),
  body("role.ar").optional().trim().notEmpty(),
  body("title.en").optional().trim().notEmpty(),
  body("title.ar").optional().trim().notEmpty(),
  body("keynote.en").optional().trim().notEmpty(),
  body("keynote.ar").optional().trim().notEmpty(),
  body("affiliation.en").optional().trim(),
  body("affiliation.ar").optional().trim(),
  body("bio.en").optional().trim(),
  body("bio.ar").optional().trim(),
  body("email").optional().isEmail().normalizeEmail(),
  body("phone").optional().isMobilePhone("any", { strictMode: false }),
  body("order").optional().isInt({ min: 0 }),
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

// Committee Validators
export const createCommitteeValidator = (): ValidationChain[] => [
  body("name.en").trim().notEmpty(),
  body("name.ar").trim().notEmpty(),
  body("committee").isIn(["scientific", "preparatory", "media", "technical"]),
  body("title.en").trim().notEmpty(),
  body("title.ar").trim().notEmpty(),
  body("affiliation.en").optional().trim(),
  body("affiliation.ar").optional().trim(),
  body("email").optional().isEmail().normalizeEmail(),
  body("order").optional().isInt({ min: 0 }),
];

export const updateCommitteeValidator = (): ValidationChain[] => [
  body("name.en").optional().trim().notEmpty(),
  body("name.ar").optional().trim().notEmpty(),
  body("committee")
    .optional()
    .isIn(["scientific", "preparatory", "media", "technical"]),
  body("title.en").optional().trim().notEmpty(),
  body("title.ar").optional().trim().notEmpty(),
  body("affiliation.en").optional().trim(),
  body("affiliation.ar").optional().trim(),
  body("email").optional().isEmail().normalizeEmail(),
  body("order").optional().isInt({ min: 0 }),
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
