import './Styles/tile.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PiletApi } from 'sample-piral';
import { appendMarioTo } from './mario';

export function setup(app: PiletApi) {
  app.registerMenu(() => <Link to="/mario5">Mario 5</Link>);

  app.registerTile(() => <Link to="/mario5" className="mario-tile">Mario5</Link>, {
    initialColumns: 2,
    initialRows: 2,
  });

  app.registerPage('/mario5', () => {
    const host = React.useRef();
    React.useEffect(() => {
      const gamePromise = appendMarioTo(host.current, {
        sound: true,
      });
      gamePromise.then(game => game.start());
      return () => gamePromise.then(game => game.pause());
    });
    return <div ref={host} />;
  });
}
