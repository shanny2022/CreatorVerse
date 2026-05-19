import { Link, useRoutes } from 'react-router-dom';
import AddCreator from './pages/AddCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';

export default function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> }
  ]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">Creatorverse</Link>
        <nav aria-label="Primary navigation">
          <Link to="/">All Creators</Link>
          <Link className="primary-link" to="/new">Add Creator</Link>
        </nav>
      </header>
      <main>{routes}</main>
    </div>
  );
}
