import React from 'react'
import Menu from '../atoms/Menu'
import Aside from '../molecules/Aside'
import './Header.scss'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container l-container'>
        <Menu />
        <Aside />
      </div>
    </header>
  )
}

export default Header
