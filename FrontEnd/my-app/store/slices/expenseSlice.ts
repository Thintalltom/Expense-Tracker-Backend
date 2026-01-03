import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ExpenseState {
    Amount: string | null;
    Description: string | null;
    Date: string | null;
    Category: string | null;
}

const initialState: ExpenseState = {
    Amount: null,
    Description: null,
    Date: null,
    Category: null
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setAmount: (state, action: PayloadAction<string>) => {
            state.Amount = action.payload;
        },      
        setDescription: (state, action: PayloadAction<string>) => {
            state.Description = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.Date = action.payload;    
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.Category = action.payload;
        },
        clearExpenseData: (state) => {
            state.Amount = null;
            state.Description = null;
            state.Date = null;
            state.Category = null;
        },
    },
});

export const { setAmount, setDescription, setDate, setCategory, clearExpenseData } = expenseSlice.actions;  
export default expenseSlice.reducer;