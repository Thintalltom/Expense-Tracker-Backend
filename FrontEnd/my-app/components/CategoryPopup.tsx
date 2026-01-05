import { useState } from "react";
import { MdCancel } from "react-icons/md";
import InputField from './InputField';
import Dropdown from './Dropdown';
import { useCreateExpenseMutation, useGetCategoryQuery } from "@/store/query/Auth-query";
import { toast } from "sonner";
interface popupClose {
    closePopup: () => void;
}

const CategoryPopup = ({ closePopup }: popupClose) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('#3B82F6');
    const [limit, setLimit] = useState<string>('');
    
    const colors = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
        '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
    ];
    const handleCreateCategory = async () => {
        // Implement category creation logic here
        toast.success('Category created successfully');
        closePopup();
    }
  return (
     <div className="fixed inset-0 bg-black/50 bg-opacity-20 flex items-end md:items-center justify-center z-50">
        <div className="w-full md:w-96 lg:w-150">
                <div className="bg-white p-8 rounded-t-lg md:rounded-lg shadow-lg w-full h-fit relative">
                    <button className="absolute top-0 right-2 mb-6 p-3 " onClick={closePopup}> <MdCancel className="w-5 h-5" /> </button>
                  
                            <div className="space-y-4 mt-4">
                                <InputField
                                    label="Category Name"
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required={true}
                                />
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                className={`w-8 h-8 rounded-full border-2 ${
                                                    selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setSelectedColor(color)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                
                                <InputField
                                    label="limit"
                                    type="text"
                                    placeholder="Enter limit"
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                />
                               
                              
                                <button
                                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                    onClick={handleCreateCategory}
                                >
                                    Add Category
                                </button>
                            </div>
                    
                 

                </div>
            </div>
    </div>
  )
}

export default CategoryPopup