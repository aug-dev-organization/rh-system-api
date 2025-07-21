/**
 * payroll router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::payroll.payroll', {
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
