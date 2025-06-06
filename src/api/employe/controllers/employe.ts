/**
 * employe controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::employe.employe', ({ strapi }) => ({
  async findWithPayrolls(ctx) {
    try {
      const { month, year } = ctx.query;

      if (!month || !year || typeof month !== 'string' || typeof year !== 'string') {
        return ctx.badRequest('Mês e ano são obrigatórios');
      }

      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59, 999);

      const employees = await strapi.db.query('api::employe.employe').findMany({
        select: ['*'],
        populate: {
          filial: {
            select: ['*']
          },
          payrolls: {
            where: {
              createdDate: {
                $gte: startDate,
                $lte: endDate
              }
            }
          }
        }
      });

      const employeesWithPayrolls = employees.map(employee => {
        return {
          ...employee,
          payrolls: employee.payrolls?.length > 0 ? employee.payrolls : null
        };
      });

      return {
        data: employeesWithPayrolls
      };
    } catch (error) {
      console.error('Erro:', error);
      return ctx.badRequest('Erro ao buscar funcionários com contracheques', { error: error.message });
    }
  }
}));
