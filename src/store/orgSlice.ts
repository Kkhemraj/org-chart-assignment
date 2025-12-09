
import { Employee, fetchOrgChart } from "@/app/lib/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface OrgState {
    root: Employee | null;
    selected: Employee | null;
    loading: boolean;
    error: string | null;
    currentEmployeeId: number;
}

const initialState: OrgState = {
    root: null,
    selected: null,
    loading: false,
    error: null,
    currentEmployeeId: 18, // default
};

export const loadOrgChart = createAsyncThunk(
    "org/load",
    async (id: number) => {
        return await fetchOrgChart(id);
    }
);

const orgSlice = createSlice({
    name: "org",
    initialState,
    reducers: {
        setSelected: (state, action: PayloadAction<Employee>) => {
            state.selected = action.payload;
        },
        setCurrentId: (state, action: PayloadAction<number>) => {
            state.currentEmployeeId = action.payload;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(loadOrgChart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadOrgChart.fulfilled, (state, action) => {
                state.loading = false;
                state.root = action.payload;
                if (!state.selected) {
                    state.selected = action.payload;
                }
            })
            .addCase(loadOrgChart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to load chart";
            });
    },
});

export const { setSelected, setCurrentId } = orgSlice.actions;
export default orgSlice.reducer;