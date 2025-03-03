"use client";
import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axios1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getResponse = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response;
};

export const getByIdResponse = async (endpoint, data) => {
  const response = await axios.get(endpoint, data);
  return response;
};

export const postResponse = async (endpoint, data) => {
  const response = await axios.post(endpoint, data);
  return response;
};

export const putResponse = async (endpoint, data) => {
  const response = await axios.put(endpoint, data);
  return response;
};

export const deleteResponse = async (endpoint, data) => {
  const response = await axios.delete(endpoint, { data });
  return response;
};

export const postFormResponse = async (endpoint, data) => {
  const response = await axios1.post(endpoint, data);
  return response;
};

export const putRequest = async (endpoint, data) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(endpoint, data, config);
  return response;
};

export const putRequestForm = async (endpoint, data, isFormData = false) => {
  // Get token from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found");
  }

  // Set up headers
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Set Content-Type only if data is not FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Make the PUT request and return the response
  const response = await axios.put(endpoint, data, { headers });
  return response; // Directly returning the response data
};
