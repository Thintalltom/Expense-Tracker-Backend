import { useState } from "react";
import { MdCancel } from "react-icons/md";
import InputField from './InputField';
import Dropdown from './Dropdown';
import { useCreateExpenseMutation } from "@/store/query/Auth-query";
import { toast } from "sonner";
import { useCreateIncomeMutation, useGetCategoryQuery, useGetIncomesQuery } from "@/store/query/Auth-query";

interface popupClose {
    closePopup: () => void;
}

const IncomePopup = ({ closePopup }: popupClose) => {
    const [source, setSource] = useState<string>('');   
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [createIncome] = useCreateIncomeMutation();
    const {refetch} = useGetIncomesQuery();
    const handleCreateIncome = async () => {
        try {
            const response = await createIncome({
                amount,
                source,
                date
            }).unwrap();
            
            await refetch();
            toast.success("Income created successfully");
            closePopup();
        } catch (error) {
            toast.error("Failed to create income");
        }
    }
    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-20 flex items-end md:items-center justify-center z-50">
            <div className="w-full md:w-96 lg:w-150">
                <div className="bg-white p-8 rounded-t-lg md:rounded-lg shadow-lg w-full h-fit relative">
                    <button className="absolute top-0 right-2 mb-6 p-3 " onClick={closePopup}> <MdCancel className="w-5 h-5" /> </button>

                    <div className="space-y-4 mt-4">
                        <InputField
                            label="Source"
                            type="text"
                            placeholder="Enter Source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required={true}
                        />

                        <InputField
                            label="Amount"
                            type="text"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <InputField
                            label="Date"
                            type="date"
                            placeholder="Enter Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />




                        <button
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            onClick={handleCreateIncome}
                        >
                            Add Category
                        </button>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default IncomePopup