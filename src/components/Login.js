import React from "react";
import * as Auth from './utils/Auth';
import {  withRouter } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault()
    if (!this.username || !this.password) {
      return;
    }
    Auth.authorize({
      identifier: this.username.current.value,
      password: this.password.current.value
    }).then((data) => {
      if (data.token) {
        this.props.handelLogin();
        this.props.history.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <input ref={this.username} id="username" name="username" className="login__input" type="text" placeholder="Email" required />
          <input ref={this.password} id="password" name="password" className="login__input" type="password" placeholder="Пароль" required />
          <button className="login__button" type="submit">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
