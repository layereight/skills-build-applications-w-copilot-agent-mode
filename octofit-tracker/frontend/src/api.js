// API utility function to get the base URL
export const getApiBaseUrl = () => {
  // In GitHub Codespaces, hostname is like: miniature-waddle-xq6pwrvr7w3p944.app.github.dev
  // We need to replace it with the backend port
  const hostname = window.location.hostname;
  
  if (hostname.includes('app.github.dev')) {
    // Extract the codespace name and replace port
    const baseUrl = `https://${hostname.replace('.app.github.dev', '')}-8000.app.github.dev`;
    return baseUrl;
  } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  } else {
    return `https://${hostname}-8000.app.github.dev`;
  }
};

export const API_BASE_URL = getApiBaseUrl();

console.log('API Base URL:', API_BASE_URL);
