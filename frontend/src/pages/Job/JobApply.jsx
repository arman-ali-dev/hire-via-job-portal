import React, { useEffect } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import microsoftLogo from "../../assets/microsoft.png";

import * as Yup from "yup";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../../store/candidate/applicationSlice";
import { useNavigate, useParams } from "react-router-dom";
import
{
  clearJobDetails,
  fetchJobDetails,
} from "../../store/candidate/jobSlice";

const applySchema = Yup.object( {
  coverLetter: Yup.string()
    .min( 20, "Cover letter should be at least 20 characters" )
    .required( "Cover letter is required" ),
  resumeUrl: Yup.mixed(),
} );

const JobApply = () =>
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useParams();
  const id = query.id;

  useEffect( () =>
  {
    dispatch( fetchJobDetails() );

    return () =>
    {
      dispatch( clearJobDetails() );
    };
  }, [ id ] );

  const { jobDetails } = useSelector( ( state ) => state.job );

  const formik = useFormik( {
    initialValues: {
      resumeUrl: null,
      coverLetter: "",
    },
    validationSchema: applySchema,
    onSubmit: ( values ) =>
    {
      console.log( values );
    },
    onSubmit: ( values ) =>
    {
      dispatch( applyJob( { ...values, id } ) ).then( ( res ) =>
      {
        if ( res.meta.requestStatus === "fulfilled" )
        {
          navigate( -1 );
        }
      } );
    },
  } );

  const handleResumeUpload = async ( e ) =>
  {
    const file = e.target.files[ 0 ];

    if ( !file ) return;

    if ( file.type !== "application/pdf" )
    {
      formik.setFieldError( "resumeUrl", "Only PDF allowed" );
      return;
    }

    formik.setFieldError( "resumeUrl", "" );
    formik.setFieldValue( "resumeUrl", "Uploading..." );

    const url = await uploadToCloudinary( file );

    if ( !url )
    {
      formik.setFieldError( "resumeUrl", "Upload failed. Try again." );
      formik.setFieldValue( "resumeUrl", "" );
      return;
    }


    formik.setFieldValue( "resumeUrl", url );
  };

  const { applyJobLoading } = useSelector( ( state ) => state.application );

  return (
    <section className="lg:px-12 px-6 pt-2.5 pb-10 lg:py-12.5">
      <div>
        <div className="lg:w-22.5 lg:h-22.5 w-17.5 h-17.5 rounded-full shadow-lg flex justify-center items-center">
          <img
            src={ microsoftLogo }
            className="lg:w-11.25 lg:h-11.25 w-7.5 h-7.5"
            alt=""
          />
        </div>

        <div className="mt-2">
          <h3 className="lg:text-[20px] md:text-[18px] text-[16px] font-bold">
            Apply for { jobDetails?.title }
          </h3>
          <p className="text-[13px] opacity-70">{ jobDetails?.company?.name }</p>
        </div>
      </div>

      <Box
        sx={ { marginTop: 4 } }
        component="form"
        onSubmit={ formik.handleSubmit }
      >
        <TextField
          fullWidth
          type="file"
          label="Upload Resume (PDF only)"
          InputLabelProps={ { shrink: true } }
          onChange={ handleResumeUpload }
          error={ formik.touched.resumeUrl && Boolean( formik.errors.resumeUrl ) }
          helperText={
            formik.values.resumeUrl === "Uploading..."
              ? "Uploading..."
              : formik.touched.resumeUrl && formik.errors.resumeUrl
          }
        />

        <TextField
          fullWidth
          multiline
          rows={ 5 }
          sx={ { mt: 3 } }
          label="Cover Letter"
          name="coverLetter"
          placeholder="Explain why you are suitable for this job..."
          value={ formik.values.coverLetter }
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
          error={
            formik.touched.coverLetter && Boolean( formik.errors.coverLetter )
          }
          helperText={ formik.touched.coverLetter && formik.errors.coverLetter }
        />

        <div className="mt-8">
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={ {
              background: "#1a6079",
              textTransform: "capitalize",
              height: "48px",
            } }
            disabled={ applyJobLoading }
          >
            { applyJobLoading ? (
              <CircularProgress color="black" size={ 14 } />
            ) : (
              "Submit Application"
            ) }
          </Button>
        </div>
      </Box>
    </section>
  );
};

export default JobApply;
