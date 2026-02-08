/**
 * API Service Layer
 * Handles all communication with the backend
 */

// Default to port 5001 to match the running backend; VITE_API_URL can override.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "current_user";

export type ApiUser = {
  id?: string;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  [key: string]: unknown;
};

type AuthResponseData = {
  token?: string;
  user?: ApiUser;
  admin?: ApiUser;
  [key: string]: unknown;
};

type AuthApiResponse = {
  token?: string;
  user?: ApiUser;
  admin?: ApiUser;
  data?: AuthResponseData;
  [key: string]: unknown;
};

type ApiPayload = Record<string, unknown>;

type ApiError = Error & {
  status?: number;
  data?: unknown;
};

const getErrorMessage = (errorData: unknown, fallback: string) => {
  if (
    typeof errorData === "object" &&
    errorData !== null &&
    "message" in errorData &&
    typeof (errorData as { message?: unknown }).message === "string"
  ) {
    return (errorData as { message: string }).message;
  }

  return fallback;
};

/**
 * Get stored JWT token
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Set JWT token
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove JWT token
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Get stored user data
 */
export const getStoredUser = (): ApiUser | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as ApiUser) : null;
};

/**
 * Set user data
 */
export const setStoredUser = (user: ApiUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Remove user data
 */
export const removeStoredUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Generic API request handler
 */
const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: ApiPayload,
  requireAuth = true,
): Promise<unknown> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);

    if (!response.ok) {
      const errorData: unknown = await response.json().catch(() => ({}));
      const error = new Error(
        getErrorMessage(errorData, `API Error: ${response.status}`),
      ) as ApiError;
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return (await response.json()) as unknown;
  } catch (error: unknown) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Authentication APIs
 */
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = (await apiRequest(
      "/auth/register",
      "POST",
      data,
      false,
    )) as AuthApiResponse;
    if (response.token) {
      setToken(response.token);
      if (response.user) {
        setStoredUser(response.user);
      }
    }
    return response;
  },

  login: async (email: string, password: string) => {
    const response = (await apiRequest(
      "/auth/login",
      "POST",
      { email, password },
      false,
    )) as AuthApiResponse;

    // Handle both admin and regular user responses
    const data = response.data;
    const fallbackUser =
      data && typeof data === "object" ? (data as ApiUser) : undefined;
    const userData =
      data?.admin ||
      data?.user ||
      response.admin ||
      response.user ||
      fallbackUser;
    const token = data?.token || response.token;

    if (token) {
      setToken(token);
      if (userData) {
        setStoredUser(userData);
      }
    }

    return {
      token,
      user: userData,
    };
  },

  logout: async () => {
    await apiRequest("/auth/logout", "POST");
    removeToken();
    removeStoredUser();
  },

  refreshToken: async () => {
    const response = (await apiRequest(
      "/auth/refresh-token",
      "POST",
    )) as AuthApiResponse;
    if (response.token) {
      setToken(response.token);
    }
    return response;
  },
};

/**
 * Registration APIs
 */
export const registrationAPI = {
  register: async (data: ApiPayload) => {
    return apiRequest("/registration", "POST", data);
  },

  getProfile: async () => {
    return apiRequest("/registration/profile", "GET");
  },

  updateProfile: async (id: string, data: ApiPayload) => {
    return apiRequest(`/registration/${id}`, "PUT", data);
  },

  updatePayment: async (
    id: string,
    data: {
      paymentStatus: "pending" | "completed" | "cancelled";
      paymentMethod?: string | null;
      transactionId?: string;
    },
  ) => {
    return apiRequest(`/registration/${id}/payment`, "PATCH", data);
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/registration?page=${page}&limit=${limit}`, "GET");
  },

  delete: async (id: string) => {
    return apiRequest(`/registration/${id}`, "DELETE");
  },
};

/**
 * Reviewer APIs
 */
export const reviewerAPI = {
  apply: async (data: ApiPayload) => {
    return apiRequest("/reviewers", "POST", data);
  },

  getById: async (id: string) => {
    return apiRequest(`/reviewers/${id}`, "GET");
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/reviewers?page=${page}&limit=${limit}`, "GET");
  },

  update: async (id: string, data: ApiPayload) => {
    return apiRequest(`/reviewers/${id}`, "PUT", data);
  },

  delete: async (id: string) => {
    return apiRequest(`/reviewers/${id}`, "DELETE");
  },

  approve: async (id: string) => {
    return apiRequest(`/reviewers/${id}/approve`, "POST");
  },

  reject: async (id: string, reason?: string) => {
    return apiRequest(`/reviewers/${id}/reject`, "POST", { reason });
  },

  assignPapers: async (id: string, paperIds: string[]) => {
    return apiRequest(`/reviewers/${id}/papers`, "POST", { paperIds });
  },

  getAssignedPapers: async (id: string) => {
    return apiRequest(`/reviewers/${id}/papers`, "GET");
  },
};

/**
 * Speaker APIs
 */
export const speakerAPI = {
  create: async (data: ApiPayload) => {
    return apiRequest("/speakers", "POST", data);
  },

  register: async (data: ApiPayload) => {
    return apiRequest("/speakers", "POST", data);
  },

  getById: async (id: string) => {
    return apiRequest(`/speakers/${id}`, "GET");
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/speakers?page=${page}&limit=${limit}`, "GET");
  },

  update: async (id: string, data: ApiPayload) => {
    return apiRequest(`/speakers/${id}`, "PUT", data);
  },

  delete: async (id: string) => {
    return apiRequest(`/speakers/${id}`, "DELETE");
  },
};

/**
 * Paper APIs
 */
export const paperAPI = {
  submit: async (data: ApiPayload) => {
    return apiRequest("/papers", "POST", data);
  },

  getById: async (id: string) => {
    return apiRequest(`/papers/${id}`, "GET");
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/papers?page=${page}&limit=${limit}`, "GET");
  },

  update: async (id: string, data: ApiPayload) => {
    return apiRequest(`/papers/${id}`, "PUT", data);
  },

  delete: async (id: string) => {
    return apiRequest(`/papers/${id}`, "DELETE");
  },

  submitReview: async (id: string, review: ApiPayload) => {
    return apiRequest(`/papers/${id}/review`, "POST", review);
  },
};

/**
 * Schedule APIs
 */
export const scheduleAPI = {
  create: async (data: ApiPayload) => {
    return apiRequest("/schedule", "POST", data);
  },

  getById: async (id: string) => {
    return apiRequest(`/schedule/${id}`, "GET");
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/schedule?page=${page}&limit=${limit}`, "GET");
  },

  update: async (id: string, data: ApiPayload) => {
    return apiRequest(`/schedule/${id}`, "PUT", data);
  },

  delete: async (id: string) => {
    return apiRequest(`/schedule/${id}`, "DELETE");
  },
};

/**
 * Committee APIs
 */
export const committeeAPI = {
  create: async (data: ApiPayload) => {
    return apiRequest("/committees", "POST", data);
  },

  getById: async (id: string) => {
    return apiRequest(`/committees/${id}`, "GET");
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/committees?page=${page}&limit=${limit}`, "GET");
  },

  update: async (id: string, data: ApiPayload) => {
    return apiRequest(`/committees/${id}`, "PUT", data);
  },

  delete: async (id: string) => {
    return apiRequest(`/committees/${id}`, "DELETE");
  },
};

/**
 * Message APIs
 */
export const messageAPI = {
  send: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const payload = {
      senderName: data.name,
      senderEmail: data.email,
      subject: data.subject,
      message: data.message,
    };
    return apiRequest("/messages", "POST", payload, false);
  },

  getById: async (id: string) => {
    return apiRequest(`/messages/${id}`, "GET");
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/messages?page=${page}&limit=${limit}`, "GET");
  },

  update: async (id: string, data: ApiPayload) => {
    return apiRequest(`/messages/${id}`, "PUT", data);
  },

  delete: async (id: string) => {
    return apiRequest(`/messages/${id}`, "DELETE");
  },
};

/**
 * Announcement APIs
 */
export const announcementAPI = {
  create: async (data: ApiPayload) => {
    return apiRequest("/announcements", "POST", data);
  },

  getById: async (id: string) => {
    return apiRequest(`/announcements/${id}`, "GET");
  },

  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/announcements?page=${page}&limit=${limit}`, "GET");
  },

  update: async (id: string, data: ApiPayload) => {
    return apiRequest(`/announcements/${id}`, "PUT", data);
  },

  delete: async (id: string) => {
    return apiRequest(`/announcements/${id}`, "DELETE");
  },
};

/**
 * Dashboard APIs (Admin only)
 */
export const dashboardAPI = {
  getStats: async () => {
    // Overview stats
    return apiRequest("/dashboard/stats/overview", "GET");
  },

  getRecentActivities: async () => {
    return apiRequest("/dashboard/activity/recent", "GET");
  },

  getParticipantsStats: async () => {
    // Use payment stats as the closest available aggregate
    return apiRequest("/dashboard/stats/payment", "GET");
  },

  getPaperStats: async () => {
    return apiRequest("/dashboard/stats/papers", "GET");
  },
};
