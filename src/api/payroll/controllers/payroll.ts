/**
 * payroll controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::payroll.payroll",
  ({ strapi }) => ({
    async createAll(ctx) {
      try {
        const result = await strapi.service("api::payroll.payroll").createAll();
        ctx.send(
          { message: result.message },
          200
        );
      } catch (error) {
        ctx.send({ message: error.message || "Erro ao criar payrolls." }, 500);
      }
    },
  })
);
