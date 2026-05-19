import { Link, useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'

export default function App() {
  const element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator /> },
  ])

  return (
    <div className="app">
      <header className="topbar">
        <h1>🌟 Creatorverse</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new">Add Creator</Link>
        </nav>
      </header>
      <main>{element}</main>
    </div>
  )
}
