import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchApplicants = createAsyncThunk(
  "applicants/fetchApplicants",
  async (employerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        `http://localhost:8081/api/employer/applications/${employerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.error(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const updateApplicantStatus = createAsyncThunk(
  "applicants/updateStatusApplicant",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.put(
        `http://localhost:8081/api/employer/applications/${applicationId}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.error(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const searchApplicants = createAsyncThunk(
  "applicanst/searchApplicants",
  async ({ employerId, keyword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        `http://localhost:8081/api/employer/applications/${employerId}/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(data);

      return data;
    } catch (error) {
      console.error(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

const employerApplicantSlice = createSlice({
  name: "employerApplicant",
  initialState: {
    applicants: [],
    loading: false,
    error: null,

    updateStatusLoading: false,
  },

  extraReducers: (builder) => {
    builder
      // FETCH APPLICANTS
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateApplicantStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplicantStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = state.applicants.map((a) =>
          a.id === action.payload.id ? action.payload : a,
        );
      })
      .addCase(updateApplicantStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEARCH APPLICANTS
      .addCase(searchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(searchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employerApplicantSlice.reducer;
