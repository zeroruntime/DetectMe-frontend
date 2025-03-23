import axios from 'axios';

// Update this with your local IP address when testing
const API_URL = 'http://192.168.238.149:5000';

export const predictDisease = async (imageBase64) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, {
      image: imageBase64
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};