import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import * as Auth from './utils/Auth';


class Register extends React.Component {
  constructor(props) {
    super(props)
    this.email = React.createRef()
    this.password = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      statusCode: null
    }
  }


  handleSubmit(e) {
    e.preventDefault()
    Auth.register({
      password: this.password.current.value,
      email: this.email.current.value
    })
    .then(() => {
      this.props.handelConfirmation();
      this.props.handelErroe()
    })
    .catch(() => {
      this.props.handelConfirmation();
      this.props.handelErroeMassage()
    })
  }

  render() {
    return (
      <div className="login">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <input id="email" name="email" ref={this.email} className="login__input" type="text" placeholder="Email" required />
          <input id="password" name="password" ref={this.password} className="login__input" type="password" placeholder="Пароль" required />
          <button className="login__button" type="submit">Зарегистрироваться</button>
        </form>
        <h3 className="login__text">Уже зарегистрированы? <Link className='login__link' to="sign-in">Войти</Link></h3>
      </div>
    )
  }
}
export default withRouter(Register);
