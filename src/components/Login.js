import React from "react";
import * as Auth from './utils/Auth';
import {  withRouter } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.state.username || !this.state.password) {
      return;
    }
    Auth.authorize(this.state.username, this.state.password)
    .then((data) => {
      if (data.jwt) {
        this.setState({username: '', password: ''}, () => {
          this.props.handelLogin();
          this.props.history.push('/')
        })
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
          <input onChange={this.handleChange} value={this.state.username} id="username" name="username" className="login__input" type="text" placeholder="Email" required />
          <input onChange={this.handleChange} value={this.state.password} id="password" name="password" className="login__input" type="password" placeholder="Пароль" required />
          <button className="login__button" type="submit">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
