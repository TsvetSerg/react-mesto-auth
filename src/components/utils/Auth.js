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
  .then((response) => {
    try {
      if (response.status === 201) {
        return response.json()
      }
    } catch(e) {
      return (e)
    }
  })
  .then((res) => {
    return res;
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
      "password": identifier,
      "email": password
    })
  })
  .then((data) => {
    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  })
  .catch((err) => {
    console.log(err);
  })
}
