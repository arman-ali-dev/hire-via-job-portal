import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthenticated, setJwt } from "../../store/candidate/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      height: { xs: 44, sm: 48, md: 52 },
    },
    "& .MuiInputBase-input": {
      padding: { xs: "0 10px", sm: "0 12px", md: "0 14px" },
      height: "100%",
      fontSize: { xs: 13, sm: 14, md: 15 },
    },
    "& .MuiInputLabel-root": {
      fontSize: { xs: 13, sm: 14, md: 15 },
    },
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const { data } = await axios.post(
          "http://localhost:8081/auth/login",
          values
        );

        dispatch(setAuthenticated(true));
        dispatch(setJwt(data.jwt));

        localStorage.setItem("jwt", data.jwt);
        navigate("/");
      } catch (error) {
        if (error.response?.data) {
          formik.setFieldError("password", error.response.data);
        } else {
          formik.setFieldError("password", "Login failed");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="lg:px-96 px-4 lg:py-32 py-10">
      <div className="text-center">
        <h1 className="font-bold text-[20px] sm:text-[22px] md:text-[24px]">
          Login
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="lg:mt-10 mt-6">
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            sx={textFieldStyles}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <div className="lg:mt-7 mt-4">
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Link className="text-(--primary-color) mt-0.5 inline-block text-[12px] lg:text-[14px]">
              Forget Password?
            </Link>
          </div>

          <div className="lg:mt-10 mt-6">
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                background: "#1a6079",
                textTransform: "capitalize",
                height: "48px",
              }}
            >
              {isLoading ? (
                <CircularProgress size={16} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
