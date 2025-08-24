import axios from "axios";
import { BASE_URL } from "@env";

// Get all events for a specific institution
export const getAllEvents = (institutionId) =>
  axios.get(`${BASE_URL}/api/institution/${institutionId}/events`);

// Create new event for a specific institution
export const createEvent = (institutionId, data) =>
  axios.post(`${BASE_URL}/api/institution/${institutionId}/events`, data);

// Get single event detail
export const getEvent = (institutionId, eventId) =>
  axios.get(`${BASE_URL}/api/institution/${institutionId}/events/${eventId}`);

// (If you have an update route, add it)
export const updateEvent = (institutionId, eventId, data) =>
  axios.put(`${BASE_URL}/api/institution/${institutionId}/events/${eventId}`, data);

// Get relevant events for an SME: requires Bearer token and SME id
export const getRelevantEventsForSme = (smeId, token) =>
  axios.get(`${BASE_URL}/sme/${smeId}/relevant/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });