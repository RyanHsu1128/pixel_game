import { mockFetchQuestions, mockSubmitScore } from './mockApi';
import axios from 'axios';

const GAS_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export const fetchQuestions = async (count) => {
  if (!GAS_URL) {
    console.warn("No GAS URL provided, using MOCK data.");
    return mockFetchQuestions(count);
  }
  try {
    const response = await axios.get(`${GAS_URL}?action=getQuestions&count=${count}`);
    // Google Apps Script usually returns data in a specific structure. 
    // We expect { status: 'success', data: [...] }
    if (response.data && response.data.questions) {
        return response.data.questions;
    }
    return response.data; // fallback
  } catch (error) {
    console.error("API Error, falling back to mock:", error);
    return mockFetchQuestions(count);
  }
};

export const submitScore = async (payload) => {
  if (!GAS_URL) {
    return mockSubmitScore(payload);
  }
  try {
    // GAS often requires POST data as stringified JSON or form-data to avoid CORS preflight issues sometimes, 
    // but axios usually handles basic CORS if the server allows. 
    // GAS 'doPost' with Content-Type application/json requires correct handling on GAS side.
    // For simplicity, we assume standard JSON POST.
    const response = await axios.post(GAS_URL, payload, {
        headers: {
            "Content-Type": "text/plain;charset=utf-8", // GAS hack to avoid strict CORS OPTIONs sometimes
        },
    });
    return response.data;
  } catch (error) {
    console.error("Submit Error:", error);
    return { success: false };
  }
};
