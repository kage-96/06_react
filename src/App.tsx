import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { BlogDetail } from './Pages/BlogDetail'
import { Layout } from './Components/Layout'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={`/posts/:id`} element={<BlogDetail />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
