import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployerProfile = createAsyncThunk(
  "employers/fetchEmployer",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        "http://localhost:8081/api/employers/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("employer profile", data);

      return data;
    } catch (error) {
      console.error(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const editCompanyProfile = createAsyncThunk(
  "employers/editCompanyProfile",
  async (companyData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      console.log(token);

      const { data } = await axios.put(
        `http://localhost:8081/api/employer/companies/${companyData.id}`,
        companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("edit company profile: ", data);

      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

const employerSlice = createSlice({
  name: "employer",
  initialState: {
    employer: null,
    loading: false,
    error: null,

    updateLoading: false,
    updateError: false,
  },

  extraReducers: (builder) => {
    builder
      // FETCH EMPLOYER PROFILE
      .addCase(fetchEmployerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(fetchEmployerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE COMPANY PROFILE
      .addCase(editCompanyProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(editCompanyProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.employer.company = action.payload;
      })
      .addCase(editCompanyProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export default employerSlice.reducer;
