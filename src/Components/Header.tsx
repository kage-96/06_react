import { Link, Outlet } from "react-router-dom"

export const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>Blog</li>
            <li>お問い合わせ</li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
}