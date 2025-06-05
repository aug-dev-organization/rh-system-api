/**
 * employe router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::employe.employe', {
  config: {
    find: {},
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
  only: ['find', 'findOne', 'create', 'update', 'delete'],
  except: [],
  prefix: '',
});
