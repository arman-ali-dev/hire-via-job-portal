import React, { useState } from "react";
import userImage from "../../../../assets/user.png";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editProfile } from "../../../../store/candidate/userSlice";
import { uploadToCloudinary } from "../../../../util/uploadToCloudinary";

const EditProfileSchema = Yup.object( {
  fullName: Yup.string().required( "Full name is required" ),

  phoneNumber: Yup.string()
    .matches( /^[0-9]{10}$/, "Phone number must be 10 digits" )
    .required( "Phone number is required" ),

  location: Yup.string().required( "Location is required" ),

  experience: Yup.string().required( "Experience is required" ),

  skills: Yup.array().min( 1, "At least one skill required" ).required(),

  resume: Yup.string().nullable(),

  profilePicture: Yup.string().nullable(),

  bio: Yup.string()
    .max( 300, "Bio max 300 characters" )
    .required( "Bio is required" ),
} );

const EditProfile = () =>
{
  const dispatch = useDispatch();
  const { editProfileLoading, user } = useSelector( ( state ) => state.user );
  const [ uploading, setUploading ] = useState( false );

  const formik = useFormik( {
    initialValues: {
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      location: user?.location || "",
      experience: user?.experience || "",
      skills: user?.skills || [],
      resume: user?.resume || "",
      profilePicture: user?.profilePicture || "",
      bio: user?.bio || "",
    },
    validationSchema: EditProfileSchema,
    onSubmit: ( values ) =>
    {
      dispatch( editProfile( values ) );
    },
  } );

  const [ skillInput, setSkillInput ] = useState( "" );

  const addSkill = () =>
  {
    if ( !skillInput.trim() ) return;

    formik.setFieldValue( "skills", [ ...formik.values.skills, skillInput ] );

    setSkillInput( "" );
  };

  const removeSkill = ( index ) =>
  {
    const updated = formik.values.skills.filter( ( _, i ) => i !== index );
    formik.setFieldValue( "skills", updated );
  };

  const handleResumeUpload = async ( e ) =>
  {

    const file = e.target.files[ 0 ];
    if ( !file ) return;

    if ( file.type !== "application/pdf" )
    {
      formik.setFieldError( "resume", "Only PDF allowed" );
      return;
    }

    const url = await uploadToCloudinary( file );
    if ( !url )
    {
      formik.setFieldError( "resume", "Upload failed" );
      return;
    }

    formik.setFieldValue( "resume", url );

  };

  const handleProfilePicUpload = async ( e ) =>
  {
    setUploading( true )
    const file = e.target.files[ 0 ];
    if ( !file ) return;

    if ( !file.type.startsWith( "image/" ) )
    {
      formik.setFieldError( "profilePicture", "Only image files allowed" );
      return;
    }

    const url = await uploadToCloudinary( file );
    if ( !url )
    {
      formik.setFieldError( "profilePicture", "Upload failed" );
      return;
    }

    formik.setFieldValue( "profilePicture", url );
    setUploading( false )
  };

  return (
    <>
      <section className="lg:px-10 px-4">
        <div className="flex gap-3 items-center">
          <div className="w-22.5 h-22.5 lg:w-35 lg:h-35 rounded-full flex justify-center relative items-center bg-white shadow-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={ formik.values.profilePicture || userImage }
              alt="profile"
            />

            { uploading && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) }
          </div>

          <div>
            <h3 className="lg:text-[17px] text-[14px] font-semibold">
              { formik.values.fullName || "Your Name" }
            </h3>

            <label>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={ handleProfilePicUpload }
              />
              <Button
                component="span"
                variant="contained"
                sx={ {
                  textTransform: "capitalize",
                  color: "#1a6079",
                  background: "transparent",
                  paddingX: { xs: "15px", md: "25px" },
                  marginTop: "6px",
                  paddingY: { xs: 0.5, md: 1 },
                } }
              >
                <span className="font-medium lg:text-[14px] text-[11px]">
                  Change Photo
                </span>
              </Button>
            </label>
          </div>
        </div>

        <div className="lg:mt-10 mt-7">
          <div className="flex flex-col md:flex-row gap-6">
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={ formik.values.fullName }
              onChange={ formik.handleChange }
              error={ formik.touched.fullName && Boolean( formik.errors.fullName ) }
              helperText={ formik.touched.fullName && formik.errors.fullName }
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={ formik.values.phoneNumber }
              onChange={ formik.handleChange }
              error={
                formik.touched.phoneNumber && Boolean( formik.errors.phoneNumber )
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-7">
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={ formik.values.location }
              onChange={ formik.handleChange }
              error={ formik.touched.location && Boolean( formik.errors.location ) }
              helperText={ formik.touched.location && formik.errors.location }
            />

            <TextField
              fullWidth
              label="Experience"
              name="experience"
              value={ formik.values.experience }
              onChange={ formik.handleChange }
              error={
                formik.touched.experience && Boolean( formik.errors.experience )
              }
              helperText={ formik.touched.experience && formik.errors.experience }
            />
          </div>

          <div className="mt-7">
            <div className="relative">
              <TextField
                fullWidth
                label="Add Skill"
                value={ skillInput }
                onChange={ ( e ) => setSkillInput( e.target.value ) }
              />
              <Button
                onClick={ addSkill }
                sx={ {
                  position: "absolute",
                  right: 4,
                  top: 7,
                  textTransform: "capitalize",
                } }
              >
                Add
              </Button>
            </div>

            <ul className="mt-4 flex gap-4 flex-wrap">
              { formik.values.skills.map( ( skill, index ) => (
                <li
                  key={ index }
                  className="text-[10px] lg:text-[13px] relative text-[#626262] bg-[rgba(0,123,255,0.1)] font-medium py-1 px-4 rounded-lg"
                >
                  { skill }
                  <ClearIcon
                    onClick={ () => removeSkill( index ) }
                    sx={ {
                      cursor: "pointer",
                      fontSize: 14,
                      position: "absolute",
                      top: 6,
                      right: 6,
                    } }
                  />
                </li>
              ) ) }
            </ul>

            { formik.touched.skills && formik.errors.skills && (
              <p className="text-red-500 text-xs mt-2">
                { formik.errors.skills }
              </p>
            ) }
          </div>

          <div className="mt-7">
            <TextField
              fullWidth
              label="Resume (PDF)"
              value={ formik.values.resume ? "Resume uploaded" : "" }
              InputProps={ {
                readOnly: true,
                endAdornment: (
                  <Button
                    component="label"
                    sx={ { textTransform: "capitalize" } }
                  >
                    Upload
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={ handleResumeUpload }
                    />
                  </Button>
                ),
              } }
              error={ formik.touched.resume && Boolean( formik.errors.resume ) }
              helperText={ formik.touched.resume && formik.errors.resume }
            />

            { formik.values.resume && (
              <a
                href={ formik.values.resume }
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                View Resume
              </a>
            ) }
          </div>

          <div className="mt-7">
            <TextField
              multiline
              rows={ 6 }
              fullWidth
              label="Bio"
              name="bio"
              value={ formik.values.bio }
              onChange={ formik.handleChange }
              error={ formik.touched.bio && Boolean( formik.errors.bio ) }
              helperText={ formik.touched.bio && formik.errors.bio }
            />
          </div>

          <div className="mt-10">
            <Button
              fullWidth
              variant="contained"
              disabled={ editProfileLoading }
              onClick={ formik.handleSubmit }
              sx={ {
                background: "#1a6079",
                textTransform: "capitalize",
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: 13, sm: 15, md: 16 },
              } }
            >
              { editProfileLoading ? "Saving..." : "Save Changes" }
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
