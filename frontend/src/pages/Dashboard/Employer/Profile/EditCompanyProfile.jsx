import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import microsoftLogo from "../../../../assets/microsoft.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { uploadToCloudinary } from "../../../../util/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { editCompanyProfile } from "../../../../store/employer/employerSlice";

const INDUSTRY_OPTIONS = [
  "IT",
  "FINANCE",
  "HEALTHCARE",
  "EDUCATION",
  "MARKETING",
  "MANUFACTURING",
  "OTHER",
];

const BUSINESS_TYPE_OPTIONS = [
  "PRIVATE",
  "GOVERNMENT",
  "STARTUP",
  "NGO",
];

const COMPANY_SIZE_OPTIONS = [ "Small", "Medium", "Large", "Enterprise" ];

const validationSchema = Yup.object( {
  name: Yup.string()
    .trim()
    .required( "Company name is required" )
    .min( 2, "Company name must be at least 2 characters" )
    .max( 100, "Company name must not exceed 100 characters" ),

  websiteUrl: Yup.string()
    .trim()
    .url( "Enter a valid URL (e.g. https://example.com)" )
    .nullable(),

  industry: Yup.string()
    .oneOf( INDUSTRY_OPTIONS, "Select a valid industry" )
    .required( "Industry type is required" ),

  size: Yup.string()
    .oneOf( COMPANY_SIZE_OPTIONS, "Select a valid company size" )
    .required( "Company size is required" ),

  location: Yup.string()
    .trim()
    .max( 200, "Location must not exceed 200 characters" )
    .nullable(),

  ownerEmail: Yup.string()
    .trim()
    .email( "Enter a valid email address" )
    .required( "Contact email is required" ),

  ownerPhoneNumber: Yup.string()
    .trim()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,14}$/,
      "Enter a valid phone number"
    )
    .nullable(),

  description: Yup.string()
    .trim()
    .max( 1000, "Description must not exceed 1000 characters" )
    .nullable(),

  foundedYear: Yup.string()
    .trim()
    .matches( /^\d{4}$/, "Enter a valid 4-digit year" )
    .nullable(),

  businessType: Yup.string()
    .oneOf( BUSINESS_TYPE_OPTIONS, "Select a valid business type" )
    .required( "Business type is required" ),

  ownerName: Yup.string()
    .trim()
    .max( 100, "Owner name must not exceed 100 characters" )
    .nullable(),


  logoUrl: Yup.string().nullable(),
} );

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    height: { xs: 40, sm: 48, md: 52 },
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    "& input": {
      padding: { xs: "0 10px", sm: "0 12px", md: "0 14px" },
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: { xs: "11px", sm: "12px", md: "13px" },
  },
};

const selectSx = {
  "& .MuiInputBase-root": {
    height: { xs: 36, sm: 44, md: 52 },
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    "& svg": {
      fontSize: { xs: "18px", sm: "20px", md: "22px" },
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: { xs: "11px", sm: "12px", md: "13px" },
  },
};

const EditCompanyProfile = () =>
{
  const [ uploading, setUploading ] = useState( false );
  const fileInputRef = useRef( null );
  const dispatch = useDispatch()

  const { employer, updateLoading } = useSelector( ( state ) => state.employer );


  const formik = useFormik( {
    initialValues: {
      id: employer?.company?.id || null,
      name: employer?.company?.name || "",
      websiteUrl: employer?.company?.websiteUrl || "",
      industry: employer?.company?.industry || "",
      size: employer?.company?.size || "",
      location: employer?.company?.location || "",
      ownerEmail: employer?.company?.ownerEmail || "",
      ownerPhoneNumber: employer?.company?.ownerPhoneNumber || "",
      ownerName: employer?.company?.ownerName || "",
      description: employer?.company?.description || "",
      foundedYear: employer?.company?.foundedYear || "",
      businessType: employer?.company?.businessType || "",
      logoUrl: employer?.company?.logoUrl || "",
    },
    validationSchema,
    onSubmit: async ( values ) =>
    {
      console.log( values );

      dispatch( editCompanyProfile( values ) );
    },
  } );

  const handleFileChange = async ( e ) =>
  {
    setUploading( true )
    const file = e.target.files[ 0 ];
    if ( !file ) return;

    if ( !file.type.startsWith( "image/" ) )
    {
      formik.setFieldError( "logoUrl", "Only image files allowed" );
      return;
    }

    const url = await uploadToCloudinary( file );
    if ( !url )
    {
      formik.setFieldError( "logoUrl", "Upload failed" );
      return;
    }

    formik.setFieldValue( "logoUrl", url );
    setUploading( false )
  };

  const handleButtonClick = () => fileInputRef.current.click();

  return (
    <section className="lg:px-10 px-4 lg:pb-0 pb-12.5">
      <div className="flex gap-3 items-center">
        <div className="w-22.5 h-22.5 lg:w-35 lg:h-35 rounded-full flex justify-center relative items-center bg-white shadow-md overflow-hidden">
          <img
            className="lg:w-[60%] rounded-full object-contain"
            src={ formik.values.logoUrl }
            alt="Company Logo"
          />

          { uploading && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) }
        </div>
        <div>
          <h3 className="lg:text-[17px] text-[14px] font-semibold">
            { formik.values.name }
          </h3>
          <Button
            variant="contained"
            onClick={ handleButtonClick }
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
              Change Logo
            </span>
          </Button>
          <input
            type="file"
            ref={ fileInputRef }
            accept="image/*"
            onChange={ handleFileChange }
            style={ { display: "none" } }
          />
        </div>
      </div>

      {/* ── Form ── */ }
      <form onSubmit={ formik.handleSubmit }>
        <div className="mt-10 flex flex-col gap-7">

          {/* Row 1 — name + websiteUrl */ }
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Company Name"
              variant="outlined"
              value={ formik.values.name }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.name && Boolean( formik.errors.name ) }
              helperText={ formik.touched.name && formik.errors.name }
              sx={ textFieldSx }
            />
            <TextField
              fullWidth
              id="websiteUrl"
              name="websiteUrl"
              label="Website URL"
              variant="outlined"
              value={ formik.values.websiteUrl }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.websiteUrl && Boolean( formik.errors.websiteUrl ) }
              helperText={ formik.touched.websiteUrl && formik.errors.websiteUrl }
              sx={ textFieldSx }
            />
          </div>

          {/* Row 2 — industry + size */ }
          <div className="flex flex-col sm:flex-row gap-4">
            <FormControl
              fullWidth
              size="small"
              sx={ selectSx }
              error={ formik.touched.industry && Boolean( formik.errors.industry ) }
            >
              <InputLabel id="industry-label">Industry Type</InputLabel>
              <Select
                labelId="industry-label"
                id="industry"
                name="industry"
                label="Industry Type"
                value={ formik.values.industry }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              >
                { INDUSTRY_OPTIONS.map( ( opt ) => (
                  <MenuItem key={ opt } value={ opt }>
                    { opt.charAt( 0 ) + opt.slice( 1 ).toLowerCase().replace( "_", " " ) }
                  </MenuItem>
                ) ) }
              </Select>
              { formik.touched.industry && formik.errors.industry && (
                <FormHelperText>{ formik.errors.industry }</FormHelperText>
              ) }
            </FormControl>

            <FormControl
              fullWidth
              size="small"
              sx={ selectSx }
              error={ formik.touched.size && Boolean( formik.errors.size ) }
            >
              <InputLabel id="size-label">Company Size</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                name="size"
                label="Company Size"
                value={ formik.values.size }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              >
                { COMPANY_SIZE_OPTIONS.map( ( opt ) => (
                  <MenuItem key={ opt } value={ opt }>
                    { opt }
                  </MenuItem>
                ) ) }
              </Select>
              { formik.touched.size && formik.errors.size && (
                <FormHelperText>{ formik.errors.size }</FormHelperText>
              ) }
            </FormControl>
          </div>

          {/* Row 3 — businessType + foundedYear */ }
          <div className="flex flex-col sm:flex-row gap-4">
            <FormControl
              fullWidth
              size="small"
              sx={ selectSx }
              error={ formik.touched.businessType && Boolean( formik.errors.businessType ) }
            >
              <InputLabel id="businessType-label">Business Type</InputLabel>
              <Select
                labelId="businessType-label"
                id="businessType"
                name="businessType"
                label="Business Type"
                value={ formik.values.businessType }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              >
                { BUSINESS_TYPE_OPTIONS.map( ( opt ) => (
                  <MenuItem key={ opt } value={ opt }>
                    { opt.charAt( 0 ) + opt.slice( 1 ).toLowerCase().replace( "_", " " ) }
                  </MenuItem>
                ) ) }
              </Select>
              { formik.touched.businessType && formik.errors.businessType && (
                <FormHelperText>{ formik.errors.businessType }</FormHelperText>
              ) }
            </FormControl>

            <TextField
              fullWidth
              id="foundedYear"
              name="foundedYear"
              label="Founded Year"
              variant="outlined"
              placeholder="e.g. 2005"
              value={ formik.values.foundedYear }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.foundedYear && Boolean( formik.errors.foundedYear ) }
              helperText={ formik.touched.foundedYear && formik.errors.foundedYear }
              sx={ textFieldSx }
            />
          </div>

          {/* Row 4 — location + ownerEmail */ }
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              variant="outlined"
              value={ formik.values.location }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.location && Boolean( formik.errors.location ) }
              helperText={ formik.touched.location && formik.errors.location }
              sx={ textFieldSx }
            />
            <TextField
              fullWidth
              id="ownerEmail"
              name="ownerEmail"
              label="Contact Email"
              variant="outlined"
              value={ formik.values.ownerEmail }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.ownerEmail && Boolean( formik.errors.ownerEmail ) }
              helperText={ formik.touched.ownerEmail && formik.errors.ownerEmail }
              sx={ textFieldSx }
            />
          </div>

          {/* Row 5 — ownerName + ownerPhoneNumber */ }
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              fullWidth
              id="ownerName"
              name="ownerName"
              label="Owner Name"
              variant="outlined"
              value={ formik.values.ownerName }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.ownerName && Boolean( formik.errors.ownerName ) }
              helperText={ formik.touched.ownerName && formik.errors.ownerName }
              sx={ textFieldSx }
            />
            <TextField
              fullWidth
              id="ownerPhoneNumber"
              name="ownerPhoneNumber"
              label="Phone Number"
              variant="outlined"
              value={ formik.values.ownerPhoneNumber }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.ownerPhoneNumber && Boolean( formik.errors.ownerPhoneNumber ) }
              helperText={ formik.touched.ownerPhoneNumber && formik.errors.ownerPhoneNumber }
              sx={ textFieldSx }
            />
          </div>

          {/* description */ }
          <TextField
            fullWidth
            multiline
            rows={ 7 }
            id="description"
            name="description"
            label="About Company"
            variant="outlined"
            value={ formik.values.description }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            error={ formik.touched.description && Boolean( formik.errors.description ) }
            helperText={
              ( formik.touched.description && formik.errors.description ) ||
              `${ formik.values.description?.length ?? 0 }/1000`
            }
            sx={ {
              "& .MuiOutlinedInput-root": {
                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                "& textarea": {
                  padding: { xs: "8px 10px", sm: "10px 12px", md: "12px 14px" },
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "11px", sm: "12px", md: "13px" },
              },
            } }
          />

          {/* Submit */ }
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={ updateLoading }
            sx={ {
              background: "#1a6079",
              textTransform: "capitalize",
              py: { xs: 1, sm: 1.2, md: 1.5 },
              mt: 6,
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
            } }
          >
            <span className="font-medium">
              { updateLoading ? "Saving..." : "Save Changes" }
            </span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditCompanyProfile;