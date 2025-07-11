/**
 * payroll service
 */

import { factories } from '@strapi/strapi';

interface Payroll {
  id: number;
  employe?: {
    documentId: string;
  };
  quantityVR: number;
  quantityVT: number;
  quantityVC: number;
  quantityDayWork: number;
  gratification: number;
  discount: number;
  paymentDate: string;
  createdDate: string;
}

// @ts-ignore
export default factories.createCoreService('api::payroll.payroll', ({ strapi }) => ({
  async create(params: { data: Payroll }) {
    const { 
      employe, 
      quantityVR = 0, 
      quantityVT = 0, 
      quantityVC = 0, 
      quantityDayWork = 0, 
      gratification = 0, 
      discount = 0,
      paymentDate,
      createdDate
    } = params.data;

    const employee = await strapi.db.query('api::employe.employe').findOne({ where: { documentId: employe } });
    
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }

    let fuelVoucher = 0;
    if (quantityVC > 0) {
      fuelVoucher = Number(employee.VC || 0) * Number(quantityVC);
    } else {
      fuelVoucher = Number(employee.VC || 0) * Number(quantityDayWork);
    }

    let transportationVoucher = 0;
    if (quantityVT > 0) {
      transportationVoucher = Number(employee.VT || 0) * Number(quantityVT);
    } else {
      transportationVoucher = Number(employee.VT || 0) * Number(quantityDayWork);
    }

    let mealVoucher = 0;
    if (quantityVR > 0) {
      mealVoucher = Number(employee.VR || 0) * Number(quantityVR);
    } else {
      mealVoucher = Number(employee.VR || 0) * Number(quantityDayWork);
    }
    
    let foodVoucher = 0;
    if (employee.VA > 0) {
      foodVoucher = Number(employee.VA || 0);
    }

    let totalPayable = Number(gratification) + fuelVoucher + transportationVoucher + mealVoucher + foodVoucher;

    if (discount > 0) {
      totalPayable -= Number(discount);
    }

    const payrollData = {
      data: {
        employe: employee.id,
        quantityVR: Number(quantityVR),
        quantityVT: Number(quantityVT),
        quantityVC: Number(quantityVC),
        quantityDayWork: Number(quantityDayWork),
        gratification: Number(gratification),
        discount: Number(discount),
        fuelVoucher,
        transportationVoucher,
        mealVoucher,
        foodVoucher,
        totalPayable,
        paymentDate,
        createdDate
      }
    };

    return await strapi.entityService.create('api::payroll.payroll', payrollData);
  },

  async update(documentId: string, params: { data: any }) {
    const payroll = await strapi.db.query('api::payroll.payroll').findOne({
      where: { documentId },
      populate: ['employe']
    });

    if (!payroll) throw new Error('Payroll não encontrado');

    const {
      quantityVR = payroll.quantityVR,
      quantityVT = payroll.quantityVT,
      quantityVC = payroll.quantityVC,
      quantityDayWork = payroll.quantityDayWork,
      gratification = payroll.gratification,
      paidAt = payroll.paidAt,
      paymentDate = payroll.paymentDate,
      createdDate = payroll.createdDate,
      discount = payroll.discount
    } = params.data;

    const employe = payroll.employe;

    if (!employe) throw new Error('Funcionário não encontrado');

    let fuelVoucher = 0;
    if (quantityVC > 0) {
      fuelVoucher = Number(employe.VC || 0) * Number(quantityVC);
    } else {
      fuelVoucher = Number(employe.VC || 0) * Number(quantityDayWork);
    }

    let transportationVoucher = 0;
    if (quantityVT > 0) {
      transportationVoucher = Number(employe.VT || 0) * Number(quantityVT);
    } else {
      transportationVoucher = Number(employe.VT || 0) * Number(quantityDayWork);
    }

    let mealVoucher = 0;
    if (quantityVR > 0) {
      mealVoucher = Number(employe.VR || 0) * Number(quantityVR);
    } else {
      mealVoucher = Number(employe.VR || 0) * Number(quantityDayWork);
    }

    let foodVoucher = 0;
    if (employe.VA > 0) {
      foodVoucher = Number(employe.VA || 0);
    }

    let totalPayable = Number(gratification) + fuelVoucher + transportationVoucher + mealVoucher + foodVoucher;

    if (discount > 0) {
      totalPayable -= Number(discount);
    }

    const payrollData = {
      data: {
        employe: employe.id,
        quantityVR: Number(quantityVR),
        quantityVT: Number(quantityVT),
        quantityVC: Number(quantityVC),
        quantityDayWork: Number(quantityDayWork),
        gratification: Number(gratification),
        fuelVoucher,
        transportationVoucher,
        mealVoucher,
        foodVoucher,
        discount,
        totalPayable,
        paidAt,
        paymentDate,
        createdDate
      }
    };

    return await strapi.entityService.update('api::payroll.payroll', payroll.id, payrollData);
  }
}));
