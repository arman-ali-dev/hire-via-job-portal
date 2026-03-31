import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FilterListIcon from "@mui/icons-material/FilterList";
import JobCard from "../Job/JobCard";
import { useSelector } from "react-redux";

const JobListings = () =>
{

  const { jobs } = useSelector( state => state.job )



  return (
    <section className="flex-1 w-full ">
      <div className="pb-2 flex justify-between items-center">
        <h3 className="lg:text-[18px] text-[12px] font-medium">{ jobs?.length } Jobs</h3>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <FilterListIcon
              sx={ {
                opacity: ".5",
                marginRight: { xs: 0.5, md: 1 },
                fontSize: { xs: 16, md: 21 },
              } }
            />
            <span className="opacity-50 lg:text-[16px] text-[12px]">
              Sort By
            </span>
          </div>
          <Box sx={ { minWidth: { xs: 90, md: 120 } } }>
            <FormControl fullWidth>
              <NativeSelect
                sx={ { fontSize: { xs: 12, md: 16 } } }
                defaultValue={ 30 }
                inputProps={ {
                  name: "Newest",
                  id: "uncontrolled-native",
                } }
              >
                <option value={ 10 }>Ten</option>
                <option value={ 20 }>Twenty</option>
                <option value={ 30 }>Newest</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:mt-8 mt-4 gap-4 lg:gap-8">
        { jobs?.map( ( j ) => (
          <JobCard job={ j } />
        ) ) }
      </div>
    </section>
  );
};

export default JobListings;
