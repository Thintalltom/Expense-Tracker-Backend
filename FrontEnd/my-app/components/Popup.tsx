import { useState } from "react";
import { MdCancel } from "react-icons/md";
import InputField from './InputField';
import Dropdown from './Dropdown';
interface popupClose {
    closePopup: () => void;
}

const Popup = ({closePopup}: popupClose) => {
    const [tab, setTab] = useState<number>(1);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [date, setDate] = useState('');
    
    const categoryOptions = [
        { value: 'food', label: 'Food' },
        { value: 'transport', label: 'Transport' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'utilities', label: 'Utilities' }
    ];
    
    const sourceOptions = [
        { value: 'salary', label: 'Salary' },
        { value: 'freelance', label: 'Freelance' },
        { value: 'investment', label: 'Investment' },
        { value: 'business', label: 'Business' }
    ];
  return (
<div className="fixed inset-0 bg-black/50 bg-opacity-20 flex items-end md:items-center justify-center z-50">
        <div className="w-full md:w-96 lg:w-150">
            <div className="bg-white p-8 rounded-t-lg md:rounded-lg shadow-lg w-full h-fit relative">
                <button className="absolute top-0 right-2 mb-6 p-3 " onClick={closePopup}> <MdCancel className="w-5 h-5" /> </button>
                <div className=" mt-2 w-full grid grid-cols-2 bg-gray-200 p-2">
                    <button className={`p-2 ${tab === 1 ? 'text-red-500 bg-white shadow-md rounded-sm' : 'text-black'}`} onClick={() => setTab(1)}>Expense</button>
                      <button className={`p-2 ${tab === 2 ? 'text-green-500 bg-white shadow-md rounded-sm' : 'text-black'}`} onClick={() => setTab(2)}>Income</button>
                </div>
             
               {
                tab === 1 && (
                    <div className="space-y-4 mt-4">
                        <InputField 
                            label="Amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <InputField 
                            label="Description"
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <Dropdown 
                                options={categoryOptions}
                                placeholder="Select category"
                                onSelect={setCategory}
                                value={category}
                            />
                        </div>
                        <InputField 
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                            Add Expense
                        </button>
                    </div>
                )
               }
                {
                tab === 2 && (
                    <div className="space-y-4 mt-4">
                        <InputField 
                            label="Amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <InputField 
                            label="Description"
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <Dropdown 
                                options={categoryOptions}
                                placeholder="Select category"
                                onSelect={setCategory}
                                value={category}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Source</label>
                            <Dropdown 
                                options={sourceOptions}
                                placeholder="Select source"
                                onSelect={setSource}
                                value={source}
                            />
                        </div>
                        <InputField 
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                            Add Income
                        </button>
                    </div>
                )
               }
               
            </div>
        </div>
    </div>
  )
}

export default Popup