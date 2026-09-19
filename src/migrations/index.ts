import * as migration_20260918_192352_initial from './20260918_192352_initial';
import * as migration_20260918_221912_testimonials_collection from './20260918_221912_testimonials_collection';

export const migrations = [
  {
    up: migration_20260918_192352_initial.up,
    down: migration_20260918_192352_initial.down,
    name: '20260918_192352_initial',
  },
  {
    up: migration_20260918_221912_testimonials_collection.up,
    down: migration_20260918_221912_testimonials_collection.down,
    name: '20260918_221912_testimonials_collection'
  },
];
