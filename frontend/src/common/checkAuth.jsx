import axios from 'axios'

export const checkAuth = async (setIsAuthenticated, setUser) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    setIsAuthenticated(false);
    return;
  }
  try {
    const response = await axios.get('http://localhost:3000/api/v1/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    setUser(response.data.user)
    setIsAuthenticated(true);
    
  } catch (error) {
    console.error('Error:', error);
    setIsAuthenticated(false);
  }
}
