export type Category = {
  label: string;
  value: string;
};

export type CategoryContextType = {
  expenseCategories: Category[];
  incomeCategories: Category[];
  addCategory: (value: string, type: string) => void;
  deleteCategory: (value: string, type: string) => void;
  editCategory: (value: string, newLabel: string, type: string) => void;
  handleSaveCategory: () => void;
  handleEditCategory: () => void;
  isButtonDisable?: boolean;
  editButton?: boolean;
  saveButton?: boolean;
  deleteButton?: boolean;
  defaultPaymentMethods: Category[];
};
