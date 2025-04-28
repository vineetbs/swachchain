
import { useState, useEffect } from 'react';

interface LocationState {
  city: string | null;
  loading: boolean;
  error: string | null;
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    city: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const getCityFromCoords = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        setState({
          city: data.city || data.locality || 'Unknown',
          loading: false,
          error: null
        });
      } catch (err) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to get city name'
        }));
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getCityFromCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Location permission denied'
          }));
        }
      );
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation not supported'
      }));
    }
  }, []);

  return state;
};
