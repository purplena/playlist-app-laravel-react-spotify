import axios from 'axios';
import { apiUrl } from './App';
import { useStore } from './useStore';

// Include cookies with all requests (required for Sanctum SPA auth): withCredentials = true;
// Helps Laravel detect AJAX requests : headers: {'X-Requested-With' : 'XMLHttpRequest'};

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

const axiosResponseInterceptor = () => {
  const { setUser, setCompany } = useStore;

  instance.interceptors.response.use(null, async (error) => {
    const status = error.response?.status;
    if (status === 419) {
      try {
        await instance.get('/sanctum/csrf-cookie');
        return instance(error.config);
      } catch (csrfError) {
        console.error('CSRF refresh failed: ', csrfError);
      }
    }
    if (status === 401) {
      setUser(null);
      setCompany(null);
    }

    return Promise.reject(error);
  });
};

export { instance, axiosResponseInterceptor };
