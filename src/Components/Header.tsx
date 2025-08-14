import type React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
export const Header:React.FC = () => {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
            <li><Link to='/'>Blog</Link></li>
            <li><Link to='/contact/'>お問い合わせ</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}