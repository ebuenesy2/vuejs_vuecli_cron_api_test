import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // değiştirerek kullan
  timeout: 10000,
});

export async function runNow() {
  const res = await api.get('/cron/run');
  return res.data;
}

export async function scheduleTest(hour, minute) {
  const res = await api.get(`/cron/schedule?hour=${hour}&minute=${minute}`);
  return res.data;
}

export async function getSuccess(page = 1, limit = 10) {
  const res = await api.get(`/cron/success?page=${page}&limit=${limit}`);
  return res.data;
}

export async function getError(page = 1, limit = 10) {
  const res = await api.get(`/cron/error?page=${page}&limit=${limit}`);
  return res.data;
}
