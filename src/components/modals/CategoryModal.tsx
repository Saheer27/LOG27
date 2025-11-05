import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useCategory } from "../../context/CategoryContext";
import ErrorMsg from "../layouts/ErrorMsg";

export default function CategoryModal({ onClose }: { onClose: () => void }) {
  const {
    expenseCategories,
    incomeCategories,
    addCategory,
    editCategory,
    deleteCategory,
    handleSaveCategory,
    isButtonDisable,
    editButton,
    saveButton,
    deleteButton,
    handleEditCategory,
  } = useCategory();

  const [isAddCategoryModal, setIsAddCategoryModal] = useState<{
    state: boolean;
    categoryType: string;
  }>({ state: false, categoryType: "ExpenseCategory" });
  const [newCategoryName, setNewCategoryName] = useState("");
  const [errors, setErrors] = useState<{
    state: boolean;
    message: string | null;
  }>({ state: false, message: null });

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white p-6 rounded-xl shadow-lg">
          <div className="overflow-y-auto max-h-[80vh]">
            <div className="text-center mb-4 grid grid-cols-2 space-x-4">
              {editButton && (
                <Button
                  type="button"
                  className="bg-blue-500 text-white rounded-lg p-2 my-2"
                  onClick={handleEditCategory}
                >
                  Edit Category
                </Button>
              )}
              {saveButton && (
                <Button
                  type="button"
                  className="bg-blue-500 text-white rounded-lg p-2 my-2"
                  onClick={handleSaveCategory}
                >
                  Save
                </Button>
              )}
              <Button
                onClick={onClose}
                className="text-sm text-blue-600 p-2 my-2 border-2 border-blue-600 rounded-lg"
              >
                Close
              </Button>
            </div>

            <div className="font-bold my-3">Expense Categories</div>
            <Button
              type="button"
              name="addExpenseCategory"
              className="border bg-indigo-500 text-white rounded-lg p-2 mb-4"
              onClick={() => {
                setIsAddCategoryModal({
                  state: !isAddCategoryModal.state,
                  categoryType: "ExpenseCategory",
                });
              }}
            >
              Add Expense Category
            </Button>
            {isAddCategoryModal.state &&
              isAddCategoryModal.categoryType === "ExpenseCategory" && (
                <>
                  <div className="mb-5 pb-5">
                    <div className="flex flex-col gap-3 ">
                      <Input
                        type="text"
                        name="AddExpenseCategory"
                        value={newCategoryName}
                        className="border border-gray-300 rounded-lg p-2"
                        placeholder="Enter Category Name"
                        onChange={(e) => {
                          setNewCategoryName(e.target.value);
                          setErrors({ state: false, message: null });
                        }}
                      />
                      {errors.message && (
                        <ErrorMsg
                          name="AddExpenseCategory"
                          message={errors.message}
                        />
                      )}
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          className="bg-green-500 text-white rounded-lg p-2 w-full"
                          name="saveNewExpenseCategory"
                          value="Save"
                          onClick={() => {
                            if (newCategoryName.trim().length === 0) {
                              setErrors({
                                state: true,
                                message: "Category name cannot be empty",
                              });
                              return;
                            }
                            addCategory(newCategoryName, "ExpenseCategory");
                            setNewCategoryName("");
                            setIsAddCategoryModal({
                              state: !isAddCategoryModal.state,
                              categoryType: "ExpenseCategory",
                            });
                          }}
                        >
                          Save
                        </Button>

                        <Button
                          type="button"
                          className="bg-red-500 text-white rounded-lg p-2 w-full"
                          name="discardNewExpenseCategory"
                          value="Discard"
                          onClick={() =>
                            setIsAddCategoryModal({
                              state: !isAddCategoryModal.state,
                              categoryType: "IncomeCategory",
                            })
                          }
                        >
                          Discard
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {expenseCategories.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <Input
                    type="text"
                    value={item.label}
                    disabled={isButtonDisable}
                    name={item.value}
                    className="border border-gray-300 rounded-lg p-2 mb-2 col-span-2 w-full"
                    placeholder={item.label}
                    onChange={(e) =>
                      editCategory(
                        e.target.name,
                        e.target.value,
                        "ExpenseCategory"
                      )
                    }
                  />
                  {deleteButton && (
                    <Button
                      type="button"
                      className="bg-red-500 text-white rounded-lg p-2 mb-2 ml-2 "
                      onClick={() =>
                        deleteCategory(item.value, "ExpenseCategory")
                      }
                    >
                      Delete
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="font-bold my-3">Income Categories</div>
            <Button
              type="button"
              name="addIncomeCategory"
              className="border bg-indigo-500 text-white rounded-lg p-2 mb-4"
              onClick={() => {
                setIsAddCategoryModal({
                  state: !isAddCategoryModal.state,
                  categoryType: "IncomeCategory",
                });
              }}
            >
              Add Income Category
            </Button>
            {isAddCategoryModal.state &&
              isAddCategoryModal.categoryType === "IncomeCategory" && (
                <>
                  <div className="mb-5 pb-5">
                    <div className="flex flex-col gap-3 ">
                      <Input
                        type="text"
                        name="AddIncomeCategory"
                        value={newCategoryName}
                        className="border border-gray-300 rounded-lg p-2"
                        placeholder="Enter Category Name"
                        onChange={(e) => {
                          setNewCategoryName(e.target.value);
                          setErrors({ state: false, message: null });
                        }}
                      />
                      {errors.message && (
                        <ErrorMsg
                          name="AddIncomeCategory"
                          message={errors.message}
                        />
                      )}

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          className="bg-green-500 text-white rounded-lg p-2 w-full"
                          name="saveNewIncomeCategory"
                          value="Save"
                          onClick={() => {
                            if (newCategoryName.trim().length === 0) {
                              setErrors({
                                state: true,
                                message: "Category name cannot be empty",
                              });
                              return;
                            }
                            addCategory(newCategoryName, "IncomeCategory");
                            setNewCategoryName("");
                            setIsAddCategoryModal({
                              state: !isAddCategoryModal.state,
                              categoryType: "IncomeCategory",
                            });
                          }}
                        >
                          Save
                        </Button>

                        <Button
                          type="button"
                          className="bg-red-500 text-white rounded-lg p-2 w-full"
                          name="discardNewIncomeCategory"
                          value="Discard"
                          onClick={() =>
                            setIsAddCategoryModal({
                              state: !isAddCategoryModal.state,
                              categoryType: "IncomeCategory",
                            })
                          }
                        >
                          Discard
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {incomeCategories.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <Input
                    type="text"
                    value={item.label}
                    disabled={isButtonDisable}
                    name={item.value}
                    className="border border-gray-300 rounded-lg p-2 mb-2 col-span-2 w-full"
                    placeholder={item.label}
                    onChange={(e) =>
                      editCategory(
                        e.target.name,
                        e.target.value,
                        "IncomeCategory"
                      )
                    }
                  />
                  {deleteButton && (
                    <Button
                      type="button"
                      className="bg-red-500 text-white rounded-lg p-2 mb-2 ml-2"
                      onClick={() =>
                        deleteCategory(item.value, "IncomeCategory")
                      }
                    >
                      Delete
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
