/**
 * custom employe routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/payrolls/create-all',
      handler: 'api::payroll.payroll.createAll',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
