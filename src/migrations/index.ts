import * as migration_20260918_192352_initial from './20260918_192352_initial';

export const migrations = [
  {
    up: migration_20260918_192352_initial.up,
    down: migration_20260918_192352_initial.down,
    name: '20260918_192352_initial'
  },
];
