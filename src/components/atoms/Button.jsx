import React from 'react'
import './Button.scss'

const Button = ({ children, theme, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${theme || ''}`}
    >
      {children}
    </button>
  )
}

export default Button
