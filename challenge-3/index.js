// Constants for tax rates
const taxRates = [
    { min: 0, max: 24000, rate: 10 },
    { min: 24001, max: 32333, rate: 25 },
    { min: 32334, max: 500000, rate: 30 },
    { min: 500001, max: 800000, rate: 32.5 },
    { min: 800001, max: Infinity, rate: 35 },
  ];
  
  // Constants for NHIF deductions
  const nhifDeductions = [
    { min: 0, max: 5999, deduction: 150 },
    { min: 6000, max: 7999, deduction: 300 },
    { min: 8000, max: 11999, deduction: 400 },
    { min: 12000, max: 14999, deduction: 500 },
    { min: 15000, max: 19999, deduction: 600 },
    { min: 20000, max: 24999, deduction: 750 },
    { min: 25000, max: 29999, deduction: 850 },
    { min: 30000, max: 34999, deduction: 900 },
    { min: 35000, max: 39999, deduction: 950 },
  ];
  
  // Function to calculate PAYE tax
  function calculatePAYE(income) {
    let paye = 0;
    let remainingIncome = income;
  
    for (const rate of taxRates) {
      if (remainingIncome <= 0) {
        break;
      }
  
      const taxableIncome = Math.min(rate.max - rate.min + 1, remainingIncome);
      const taxAmount = (taxableIncome * rate.rate) / 100;
      paye += taxAmount;
      remainingIncome -= taxableIncome;
    }
  
    return paye;
  }
  
  // Function to calculate NHIF deduction
  function calculateNHIF(grossPay) {
    for (const deduction of nhifDeductions) {
      if (grossPay >= deduction.min && grossPay <= deduction.max) {
        return deduction.deduction;
      }
    }
    return 0;
  }
  
  // Function to calculate NSSF deduction based on the new NSSF Act
  function calculateNSSFNew(pensionablePay) {
    const tierIRate = 6 / 100;
    const tierIILimit = 18000;
    const tierIIRate = 6 / 100;
  
    let nssfDeduction = 0;
  
    if (pensionablePay <= tierIILimit) {
      nssfDeduction = pensionablePay * tierIRate;
    } else {
      nssfDeduction = tierIILimit * tierIRate + (pensionablePay - tierIILimit) * tierIIRate;
    }
  
    return nssfDeduction;
  }
  
  // Function to calculate net salary
  function calculateNetSalary(basicSalary, benefits) {
    // Calculate gross pay
    const grossPay = basicSalary + benefits;
  
    // Calculate NHIF deduction
    const nhifDeduction = calculateNHIF(grossPay);
  
    // Calculate pensionable pay for NSSF (assumed to be the same as gross pay)
    const pensionablePay = grossPay;
  
    // Calculate NSSF deduction based on the new NSSF Act
    const nssfDeduction = calculateNSSFNew(pensionablePay);
  
    // Calculate PAYE tax
    const paye = calculatePAYE(grossPay);
  
    // Calculate net salary
    const netSalary = grossPay - paye - nhifDeduction - nssfDeduction;
  
    return {
      grossPay,
      paye,
      nhifDeduction,
      nssfDeduction,
      netSalary,
    };
  }
  
  // Example usage
  const basicSalary = 60000; // Replace with the individual's basic salary
  const benefits = 5000; // Replace with the individual's benefits
  
  const salaryDetails = calculateNetSalary(basicSalary, benefits);
  
  console.log('Gross Pay:', salaryDetails.grossPay);
  console.log('PAYE Tax:', salaryDetails.paye);
  console.log('NHIF Deduction:', salaryDetails.nhifDeduction);
  console.log('NSSF Deduction:', salaryDetails.nssfDeduction);
  console.log('Net Salary:', salaryDetails.netSalary);
  

  