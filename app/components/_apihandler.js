"use client";
import axios from 'axios';

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
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