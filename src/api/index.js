const API_URL = 'https://stormy-falls-42020.herokuapp.com';

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const token = localStorage.getItem('loggedUser');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export const userCheck = (email) => {
  return fetch(`${API_URL}/user/check`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email })
  });
};

export const signup = user => {
  return fetch(`${API_URL}/user/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user)
  });
};

export const auth = email => {
  return fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email })
  });
};

export const loadUserTweets = username => {
  return fetch(`${API_URL}/profile/${username}/tweets`);
};

export const newTweet = text => {
  return fetch(`${API_URL}/tweet`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ text })
  })
};