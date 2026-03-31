import React from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postJob } from "../../../../store/employer/employerJobSlice";
import CircularProgress from "@mui/material/CircularProgress";

const PostJob = () =>
{
  const dispatch = useDispatch();
  const { employer } = useSelector( ( state ) => state.employer );

  const formik = useFormik( {
    initialValues: {
      title: "",
      description: "",
      categoryId: "",
      companyId: employer?.company?.id,
      requiredExperience: "",
      avgSalary: "",
      timing: "",
      responsibilities: [],
      responsibilityInput: "",
      requiredSkills: [],
      skillInput: "",
    },

    validationSchema: Yup.object( {
      title: Yup.string()
        .min( 3, "Job title must be at least 3 characters" )
        .required( "Job title is required" ),

      description: Yup.string()
        .min( 50, "Description must be at least 50 characters" )
        .required( "Job description is required" ),

      categoryId: Yup.string().required( "Category is required" ),

      companyId: Yup.string().required( "Company is required" ),

      requiredExperience: Yup.string().required( "Experience is required" ),

      avgSalary: Yup.string().required( "Average salary is required" ),

      timing: Yup.string().required( "Job type is required" ),

      responsibilities: Yup.array().min(
        1,
        "At least one responsibility is required",
      ),

      requiredSkills: Yup.array().min( 1, "At least one skill is required" ),
    } ),
    onSubmit: ( values, { resetForm } ) =>
    {
      const payload = {
        title: values.title,
        description: values.description,
        categoryId: values.categoryId,
        companyId: values.companyId,
        requiredExperience: values.requiredExperience,
        avgSalary: values.avgSalary,
        timing: values.timing,
        responsibilities: values.responsibilities,
        requiredSkills: values.requiredSkills,
      };


      dispatch( postJob( payload ) );
      resetForm();
    },
  } );

  // Responsblities
  const addResHandler = () =>
  {
    const value = formik.values.responsibilityInput.trim();

    if ( !value ) return;

    formik.setFieldValue( "responsibilities", [
      ...formik.values.responsibilities,
      value,
    ] );

    formik.setFieldValue( "responsibilityInput", "" );
  };

  const removeResHandler = ( idx ) =>
  {
    const updated = formik.values.responsibilities.filter( ( _, i ) => i !== idx );
    formik.setFieldValue( "responsibilities", updated );
  };

  // Skills
  const addSkillHandler = () =>
  {
    const value = formik.values.skillInput.trim();

    if ( !value ) return;

    formik.setFieldValue( "requiredSkills", [
      ...formik.values.requiredSkills,
      value,
    ] );

    formik.setFieldValue( "skillInput", "" );
  };

  const removeSkillHandler = ( idx ) =>
  {
    const updated = formik.values.requiredSkills.filter( ( _, i ) => i !== idx );
    formik.setFieldValue( "requiredSkills", updated );
  };

  // categories
  const { categories } = useSelector( ( state ) => state.category );

  // loading
  const { createJobLoading } = useSelector( ( state ) => state.employerJob );

  return (
    <>
      <section className="px-4 sm:px-4 md:px-10 ">
        <h2 className="text-[16px] lg:text-[20px] font-bold">Post a Job</h2>

        <div className="mt-8 sm:mt-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-7">
            <TextField
              fullWidth
              name="title"
              value={ formik.values.title }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.title && Boolean( formik.errors.title ) }
              helperText={ formik.touched.title && formik.errors.title }
              label="Job Title"
              variant="outlined"
              sx={ {
                "& .MuiOutlinedInput-root": {
                  height: { xs: 44, sm: 48, md: 52 },
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px",
                  height: "100%",
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: 12, sm: 14, md: 15 },
                },
              } }
            />

            <TextField
              fullWidth
              name="description"
              value={ formik.values.description }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={
                formik.touched.description && Boolean( formik.errors.description )
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              label="Job Description"
              variant="outlined"
              sx={ {
                "& .MuiOutlinedInput-root": {
                  height: { xs: 44, sm: 48, md: 52 },
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px",
                  height: "100%",
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: 12, sm: 14, md: 15 },
                },
              } }
            />
          </div>

          <div className="mt-6 sm:mt-7 flex flex-col md:flex-row gap-5 md:gap-7">
            <FormControl fullWidth>
              <InputLabel sx={ { fontSize: { xs: 12, sm: 14 } } }>
                Category
              </InputLabel>
              <Select
                name="categoryId"
                value={ formik.values.categoryId }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                label="Category"
                sx={ {
                  height: { xs: 44, sm: 48, md: 52 },
                  fontSize: { xs: 12, sm: 14, md: 16 },
                } }
              >
                { categories?.map( ( c ) => (
                  <MenuItem value={ c?.id }>{ c?.name }</MenuItem>
                ) ) }
              </Select>

              { formik.touched.categoryId && formik.errors.categoryId && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  { formik.errors.categoryId }
                </p>
              ) }
            </FormControl>


          </div>

          <div className="flex mt-6 sm:mt-7  flex-col md:flex-row gap-5 md:gap-7">
            <TextField
              fullWidth
              name="requiredExperience"
              value={ formik.values.requiredExperience }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={
                formik.touched.requiredExperience &&
                Boolean( formik.errors.requiredExperience )
              }
              helperText={
                formik.touched.requiredExperience &&
                formik.errors.requiredExperience
              }
              label="Experience"
              variant="outlined"
              sx={ {
                "& .MuiOutlinedInput-root": {
                  height: { xs: 44, sm: 48, md: 52 },
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px",
                  height: "100%",
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: 12, sm: 14, md: 15 },
                },
              } }
            />

            <TextField
              fullWidth
              name="avgSalary"
              value={ formik.values.avgSalary }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={
                formik.touched.avgSalary && Boolean( formik.errors.avgSalary )
              }
              helperText={ formik.touched.avgSalary && formik.errors.avgSalary }
              label="Average Salary"
              variant="outlined"
              sx={ {
                "& .MuiOutlinedInput-root": {
                  height: { xs: 44, sm: 48, md: 52 },
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px",
                  height: "100%",
                  fontSize: { xs: 12, sm: 14, md: 16 },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: 12, sm: 14, md: 15 },
                },
              } }
            />
          </div>

          <div className="mt-6 sm:mt-7 flex flex-col md:flex-row gap-5 md:gap-7">
            <FormControl fullWidth>
              <InputLabel sx={ { fontSize: { xs: 12, sm: 14 } } }>
                Job Type
              </InputLabel>
              <Select
                name="timing"
                value={ formik.values.timing }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                label="Job Type"
                sx={ {
                  height: { xs: 44, sm: 48, md: 52 },
                  fontSize: { xs: 12, sm: 14, md: 16 },
                } }
              >
                <MenuItem value={ "FULL_TIME" }>Full Time</MenuItem>
                <MenuItem value={ "PART_TIME" }>Part Time</MenuItem>
                <MenuItem value={ "INTERNSHIP" }>Internship</MenuItem>
                <MenuItem value={ "CONTRACT" }>Contract</MenuItem>
              </Select>

              { formik.touched.timing && formik.errors.timing && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  { formik.errors.timing }
                </p>
              ) }
            </FormControl>
          </div>

          <div className="mt-6 sm:mt-7">
            <div className="relative">
              <TextField
                fullWidth
                name="responsibilityInput"
                label="Responsibilities"
                variant="outlined"
                value={ formik.values.responsibilityInput }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                sx={ {
                  "& .MuiOutlinedInput-root": {
                    height: { xs: 44, sm: 48, md: 52 },
                    fontSize: { xs: 12, sm: 14, md: 16 },
                  },
                  "& .MuiInputBase-input": {
                    padding: "0 14px",
                    height: "100%",
                    fontSize: { xs: 12, sm: 14, md: 16 },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: 12, sm: 14, md: 15 },
                  },
                } }
              />

              <Button
                type="button"
                onClick={ addResHandler }
                sx={ {
                  textTransform: "capitalize",
                  position: "absolute",
                  right: 4,
                  top: 6,
                  fontSize: { xs: 12, sm: 14 },
                } }
              >
                <span className="text-(--primary-color)">Add</span>
              </Button>

              { formik.touched.responsibilities &&
                formik.errors.responsibilities && (
                  <p className="text-red-500 text-xs mt-1">
                    { formik.errors.responsibilities }
                  </p>
                ) }
            </div>

            <div className="mt-3 sm:mt-4">
              <ul className="mt-4 flex gap-4 flex-wrap">
                { formik.values.responsibilities?.map( ( elem, idx ) => (
                  <li
                    key={ idx }
                    className="text-[10px] lg:text-[13px] relative text-[#626262] mt-1 bg-[rgba(0,123,255,0.1)] font-medium py-1 px-4 sm:px-6 rounded-lg"
                  >
                    <span>{ elem }</span>
                    <ClearIcon
                      onClick={ () => removeResHandler( idx ) }
                      sx={ {
                        cursor: "pointer",
                        fontSize: { xs: 12, sm: 16 },
                        color: "#000",
                        position: "absolute",
                        top: { xs: 6, md: 6 },
                        right: { xs: 4, md: 6 },
                      } }
                    />
                  </li>
                ) ) }
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-7">
            <div className="relative">
              <TextField
                fullWidth
                name="skillInput"
                label="Required Skills"
                variant="outlined"
                value={ formik.values.skillInput }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                sx={ {
                  "& .MuiOutlinedInput-root": {
                    height: { xs: 44, sm: 48, md: 52 },
                    fontSize: { xs: 12, sm: 14, md: 16 },
                  },
                  "& .MuiInputBase-input": {
                    padding: "0 14px",
                    height: "100%",
                    fontSize: { xs: 12, sm: 14, md: 16 },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: 12, sm: 14, md: 15 },
                  },
                } }
              />

              <Button
                onClick={ addSkillHandler }
                sx={ {
                  textTransform: "capitalize",
                  position: "absolute",
                  right: 4,
                  top: 6,
                  fontSize: { xs: 12, sm: 14 },
                } }
              >
                <span className="text-(--primary-color)">Add</span>
              </Button>

              { formik.touched.requiredSkills &&
                formik.errors.requiredSkills && (
                  <p className="text-red-500 text-xs mt-1">
                    { formik.errors.requiredSkills }
                  </p>
                ) }
            </div>

            <div className="mt-3 sm:mt-4">
              <ul className="mt-4 flex gap-4 flex-wrap">
                { formik.values.requiredSkills?.map( ( elem, idx ) => (
                  <li
                    key={ idx }
                    className="text-[10px] lg:text-[13px] relative text-[#626262] mt-1 bg-[rgba(0,123,255,0.1)] font-medium py-1 px-4 sm:px-6 rounded-lg"
                  >
                    <span>{ elem }</span>
                    <ClearIcon
                      onClick={ () => removeSkillHandler( idx ) }
                      sx={ {
                        cursor: "pointer",
                        fontSize: { xs: 12, sm: 16 },
                        color: "#000",
                        position: "absolute",
                        top: { xs: 6, md: 6 },
                        right: { xs: 4, md: 6 },
                      } }
                    />
                  </li>
                ) ) }
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <Button
              onClick={ formik.handleSubmit }
              fullWidth
              variant="contained"
              sx={ {
                background: "#1a6079",
                textTransform: "capitalize",
                paddingY: { xs: 1, sm: 1.2, md: 1.5 },
                fontSize: { xs: 14, sm: 15, md: 16 },
                height: "48px",
              } }
              disabled={ createJobLoading }
            >
              { createJobLoading ? (
                <CircularProgress size={ 14 } color="black" />
              ) : (
                <span className="font-medium">Post</span>
              ) }
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostJob;
