import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

const FilterAsideBar = ( { openSlideBar, setOpenSlideBar } ) =>
{
  return (
    <>
      { openSlideBar && (
        <div
          className="fixed inset-0 bg-black/40 z-9998 xl:hidden"
          onClick={ () => setOpenSlideBar( false ) }
        />
      ) }
      <aside
        className={ ` bg-white px-5 xl:px-0 fixed top-0  z-9999 xl:z-0 h-full left-0 xl:relative overflow-y-auto duration-300 w-full sm:w-[60%] md:w-[30%] ${ openSlideBar ? "translate-x-0  " : "-translate-x-full"
          } 
        xl:translate-x-0 xl:w-[30%]"`}
      >
        <div className=" py-4 border-b-2 xl:hidden flex justify-end">
          <IconButton
            size="small"
            sx={ { border: "1px solid #afafaf" } }
            onClick={ () => setOpenSlideBar( false ) }
          >
            <CloseIcon sx={ { fontSize: 17 } } />
          </IconButton>
        </div>
        <div className="pb-2 pt-5 lg:pt-0">
          <h3 className="lg:text-[18px]  font-medium">Filter</h3>
        </div>

        <div className=" mb-5 border-[rgba(207,203,203,.6)] border-t pt-5">
          <h3 className="opacity-50 font-medium">JOB TYPE</h3>

          <div className="mt-4  space-y-3">
            { [
              "Full Time",
              "Part Time",
              "Internship",
              "Contractor",
              "Remote",
            ].map( ( elem ) =>
            {
              return (
                <div>
                  <Checkbox
                    sx={ {
                      height: 12,
                      width: 12,
                      fontSize: 16,
                      verticalAlign: "text-top",
                    } }
                  />
                  <span className="opacity-60 text-[15px] ml-2 align-text-bottom">
                    { elem }
                  </span>
                </div>
              );
            } ) }
          </div>
        </div>

        <div className="mb-5 border-[rgba(207,203,203,.6)] border-t pt-5">
          <h3 className="opacity-50 font-medium">SALARY</h3>

          <div className="mt-4 flex gap-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Min</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Min"
              >
                <MenuItem value={ 10 }>Ten</MenuItem>
                <MenuItem value={ 20 }>Twenty</MenuItem>
                <MenuItem value={ 30 }>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Max</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Max"
              >
                <MenuItem value={ 10 }>Ten</MenuItem>
                <MenuItem value={ 20 }>Twenty</MenuItem>
                <MenuItem value={ 30 }>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className=" mb-5 border-[rgba(207,203,203,.6)] border-t pt-5">
          <h3 className="opacity-50 font-medium">EXPERIENCE LEVEL</h3>

          <div className="mt-4  space-y-3">
            { [
              "Fresher",
              "1 - 2 Years",
              "3 - 5 Years",
              "6 - 8 Years",
              "9+ Years",
            ].map( ( elem ) =>
            {
              return (
                <div>
                  <Checkbox
                    sx={ {
                      height: 12,
                      width: 12,
                      fontSize: 16,
                      verticalAlign: "text-top",
                    } }
                  />
                  <span className="opacity-60 text-[15px] ml-2 align-text-bottom">
                    { elem }
                  </span>
                </div>
              );
            } ) }
          </div>
        </div>

        <div className=" border-[rgba(207,203,203,.6)] border-t pt-5">
          <h3 className="opacity-50 font-medium">CAREER LEVEL</h3>

          <div className="mt-4  space-y-3">
            { [ "Manager", "Senior", "Student", "Executive", "Director" ].map(
              ( elem ) =>
              {
                return (
                  <div>
                    <Checkbox
                      sx={ {
                        height: 12,
                        width: 12,
                        fontSize: 16,
                        verticalAlign: "text-top",
                      } }
                    />
                    <span className="opacity-60 text-[15px] ml-2 align-text-bottom">
                      { elem }
                    </span>
                  </div>
                );
              }
            ) }
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterAsideBar;
