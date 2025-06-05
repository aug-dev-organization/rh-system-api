/**
 * custom employe routes
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/employes/with-payrolls',
      handler: 'api::employe.employe.findWithPayrolls',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
}; 