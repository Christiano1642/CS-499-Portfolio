require("dotenv").config();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";
module.exports = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      trips: `${API_BASE_URL}/trips`,
      users: `${API_BASE_URL}/users`,
      bookings: `${API_BASE_URL}/bookings`,
    },
    getOptions: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN || ""}`,
      },
    },
    postOptions: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN || ""}`,
      },
    },
    putOptions: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN || ""}`,
      },
    },
  },
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV || "development",
};
