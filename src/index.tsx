import './Styles/tile.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PiletApi } from 'sample-piral';

const Mario = React.lazy(() => import('./mario'));

export function setup(app: PiletApi) {
  app.registerMenu(() => <Link to="/mario5">Mario 5</Link>);

  app.registerTile(
    () => (
      <Link to="/mario5" className="mario-tile">
        Mario5
      </Link>
    ),
    {
      initialColumns: 2,
      initialRows: 2,
    },
  );

  app.registerPage('/mario5', Mario);
}
