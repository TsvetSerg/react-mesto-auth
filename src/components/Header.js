import React from "react";
import logoImage from '../images/logo1.svg'
import { withRouter } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.props.loggedIn) {      // Добавяем логику что бы не рендерить кадый раз разные кнопки
      this.props.handelTokenRemove();
    } else {
      this.props.history.push('/sign-up');
    }

  }



  render() {
    return (
      <header className="header">
      <img className="header__logo" src={logoImage} alt="Лого" />
      <p>{this.props.loggedIn ? this.props.email : ''}</p>
      <button onClick={this.handleSubmit}>{this.props.loggedIn ? 'Выйти' : 'Регистрация'}</button>
    </header>
    )
  }

}


export default withRouter(Header);
