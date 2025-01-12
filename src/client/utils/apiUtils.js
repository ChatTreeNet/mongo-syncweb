/**
 * API utility functions for making requests to the backend
 */

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  const text = await response.text();
  let data;
  
  try {
    data = isJson ? JSON.parse(text) : text;
  } catch (error) {
    console.error('Error parsing response:', error);
    throw new Error('Invalid response format');
  }

  if (!response.ok) {
    const error = new Error(data.error || data.message || 'Unknown error occurred');
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
};

export const fetchConfig = async () => {
  const response = await fetch('/api/config');
  return handleResponse(response);
};

export const fetchStatus = async () => {
  const response = await fetch('/api/config/status');
  return handleResponse(response);
};

export const fetchLogs = async (limit = 50) => {
  const response = await fetch(`/api/config/logs?limit=${limit}`);
  return handleResponse(response);
};

export const clearLogs = async () => {
  const response = await fetch('/api/config/logs', { method: 'DELETE' });
  return handleResponse(response);
};

export const fetchCollections = async (sourceUrl, targetUrl) => {
  if (!sourceUrl || !targetUrl) return null;
  
  const response = await fetch(
    `/api/config/collections?sourceUrl=${encodeURIComponent(sourceUrl)}&targetUrl=${encodeURIComponent(targetUrl)}`
  );
  return handleResponse(response);
};

export const saveConfig = async (config) => {
  const response = await fetch('/api/config', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
    credentials: 'same-origin'
  });
  return handleResponse(response);
};

export const triggerSync = async () => {
  const response = await fetch('/api/config/sync', { method: 'POST' });
  return handleResponse(response);
};

export const validateConfig = (config) => {
  const errors = [];
  
  if (!config.sourceUrl) errors.push('Source Database URL is required');
  if (!config.targetUrl) errors.push('Target Database URL is required');
  if (!config.collections) errors.push('At least one collection must be selected');
  
  // Validate URLs
  try {
    new URL(config.sourceUrl.startsWith('mongodb://') ? 
      config.sourceUrl.replace('mongodb://', 'http://') : 
      config.sourceUrl
    );
    new URL(config.targetUrl.startsWith('mongodb://') ? 
      config.targetUrl.replace('mongodb://', 'http://') : 
      config.targetUrl
    );
  } catch (error) {
    errors.push('Invalid database URL format');
  }

  return errors;
};