import classes from './Header.module.css';
export const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>Blog</li>
            <li>お問い合わせ</li>
          </ul>
        </nav>
      </header>
    </>
  )
}