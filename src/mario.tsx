import './Styles/mario.scss';
import * as React from 'react';
import { Level } from './engine';
import { assets } from './assets';
import { keys } from './keys';
import { LevelFormat } from './types';

interface MarioGameOptions {
  sound?: boolean;
  level?: number;
  levels?: Array<LevelFormat>;
}

function appendMarioTo(host: Element, options: MarioGameOptions = {}) {
  const loadingLevels = options.levels || import('./levels').then(m => m.default);

  return Promise.resolve(loadingLevels).then(levels => {
    const level = new Level(host, keys, levels, assets);
    level.load(levels[options.level || 0]);

    if (options.sound !== false) {
      import('./audio').then(({ HtmlAudioManager }) => {
        const sounds = new HtmlAudioManager();
        level.setSounds(sounds);
      });
    }

    return level;
  });
}

let gamePromise: Promise<Level>;
let container: HTMLDivElement;

const MarioGame: React.FC = () => {
  const host = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (!gamePromise) {
      container = document.createElement('div');
      gamePromise = appendMarioTo(container, {
        sound: true,
      });
    }

    host.current.appendChild(container);
    gamePromise.then(game => game.start());
    return () => gamePromise.then(game => game.pause());
  });
  return <div ref={host} />;
};

export default MarioGame;
