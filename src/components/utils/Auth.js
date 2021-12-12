import React from 'react';

export const baseUrl = 'https://auth.nomoreparties.co';

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
  return res.json()
})
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(err);
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
  .catch((err) => {
    console.log(err);
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
  .catch((err) => {
    console.log(err);
  })
}


