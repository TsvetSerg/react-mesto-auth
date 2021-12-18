import React from 'react';

export const baseUrl = 'https://auth.nomoreparties.co';

function checked(res) {         // При испоьзовании этой функции в then
  if (res.ok) {                 // из-за облласти видимости (скорей всего), в app catch не выпоняется
    return res.json();
  }
  return Promise.reject(res.status)
}

export const register = ({password, email}) => {
  return fetch(`${baseUrl}/signup`,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "password": password,
    "email": email
  })
})
.then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
})
  .then((data) => {
    return data;
  })
}

export const authorize = ({identifier, password}) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": identifier
    })
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    if (data) {
      localStorage.setItem('token', data.token);
    }
    return data;
  })
}


export const getToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => {
    return res.json();
  })
  .then(({data}) => {
    return (data)
  })
}


