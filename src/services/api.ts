import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// let isRefreshing = false;
// let failedQueue: {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: any) => void;
// }[] = [];

// const processQueue = (error: any, tokenRefreshed = false) => {
//   failedQueue.forEach(({ resolve, reject }) => {
//     if (error) {
//       reject(error);
//     } else {
//       resolve(tokenRefreshed);
//     }
//   });

//   failedQueue = [];
// };

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (!error.response) {
      return Promise.reject(error)
    }

    if (error.response.status !== 401) {
      return Promise.reject(error)
    }

    if (originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    await api.post(`${baseURL}/auth/refresh`)
    
    originalRequest._retry = true
    
    return api(originalRequest)

    // if (isRefreshing) {
    //   return new Promise((resolve, reject) => {
    //     failedQueue.push({ resolve, reject });
    //   }).then(() => api(originalRequest));
    // }

    // isRefreshing = true;

    // try {
    //   await api.post('/auth/refresh', {}, { withCredentials: true });

    //   processQueue(null, true);
    //   return api(originalRequest);
    // } catch (refreshError) {
    //   processQueue(refreshError, false);
    //   // logout();
    //   return Promise.reject(refreshError);
    // } finally {
    //   isRefreshing = false;
    // }
    // if (error.status === 401) {
    //   try {
    //     await api.post(`${baseURL}/auth/refresh`)
    //     return
    //   } catch (error) {
    //     throw error
    //   }
    // }
    // throw error;
  }
)

export default api
