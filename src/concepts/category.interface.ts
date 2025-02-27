export enum Categories {
  Groceries = 'Groceries',
  Restaurant = 'Restaurant',
  Transportation = 'Transportation',
  Utilities = 'Utilities',
  Entertainment = 'Entertainment',
  Healthcare = 'Healthcare',
  Clothing = 'Clothing',
  Travel = 'Travel',
  Education = 'Education',
  Home = 'Home',
  PersonalCare = 'Personal Care',
  Insurance = 'Insurance',
  Taxes = 'Taxes',
  Fees = 'Fees',
  Investments = 'Investments',
  Donations = 'Donations',
  Salary = 'Salary',
  Refunds = 'Refunds',
  Rent = 'Rent',
  Loan = 'Loan',
  Other = 'Other',
}

export interface Category {
  category: Categories;
  description: string;
  externalId: string;
}
