import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { updateApplicantStatus } from "../../../../store/employer/employerApplicantSlice";
import ApplicantDetailModal from "./ApplicantDetailModal";

const STATUS_OPTIONS = [
    "APPLIED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "INTERVIEW",
    "OFFERED",
    "REJECTED",
];

const STATUS_COLORS = {
    APPLIED: { color: "#6b7280", bg: "#f3f4f6" },
    UNDER_REVIEW: { color: "#b45309", bg: "#fef3c7" },
    SHORTLISTED: { color: "#1d4ed8", bg: "#dbeafe" },
    INTERVIEW: { color: "#7c3aed", bg: "#ede9fe" },
    OFFERED: { color: "#15803d", bg: "#dcfce7" },
    REJECTED: { color: "#b91c1c", bg: "#fee2e2" },
};


const formatStatus = ( status ) =>
{
    if ( !status ) return "";
    return status.charAt( 0 ) + status.slice( 1 ).toLowerCase().replace( "_", " " );
};

const ApplicantTable = () =>
{
    const dispatch = useDispatch();
    const { applicants } = useSelector( ( state ) => state.employerApplicant );

    const [ updatingId, setUpdatingId ] = useState( null );
    const [ selectedApplicant, setSelectedApplicant ] = useState( null );
    const [ modalOpen, setModalOpen ] = useState( false );

    // Pagination
    const [ page, setPage ] = useState( 1 );
    const rowsPerPage = 7;
    const startIndex = ( page - 1 ) * rowsPerPage;
    const paginatedApplicants = applicants?.slice( startIndex, startIndex + rowsPerPage );
    const totalPages = Math.ceil( applicants?.length / rowsPerPage ) || 1;

    const handleStatusChange = async ( applicationId, newStatus ) =>
    {
        setUpdatingId( applicationId );
        await dispatch( updateApplicantStatus( { applicationId, status: newStatus } ) );
        setUpdatingId( null );
    };

    const handleViewClick = ( applicant ) =>
    {
        setSelectedApplicant( applicant );
        setModalOpen( true );
    };

    return (
        <>
            <TableContainer component={ Paper } sx={ { marginTop: 3, overflowX: "auto" } }>
                <Table sx={ { minWidth: 600 } } aria-label="applicants table">
                    <TableHead>
                        <TableRow>
                            { [ "Name", "Skills", "Location", "Experience", "Status", "Action" ].map( ( head, idx ) => (
                                <TableCell
                                    key={ idx }
                                    sx={ {
                                        px: { xs: 1.5, sm: 2, md: 3 },
                                        fontSize: { xs: "12px", sm: "13px", md: "14px" },
                                        fontWeight: 600,
                                        color: "#374151",
                                    } }
                                >
                                    { head }
                                </TableCell>
                            ) ) }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { paginatedApplicants?.map( ( a, idx ) =>
                        {
                            const isUpdating = updatingId === a.id;
                            const currentStatus = a.status;
                            const statusStyle = STATUS_COLORS[ currentStatus ] || STATUS_COLORS.APPLIED;

                            return (
                                <TableRow key={ idx } sx={ { "&:last-child td, &:last-child th": { border: 0 } } }>
                                    <TableCell sx={ { px: { xs: 1.5, sm: 2, md: 3 }, fontSize: { xs: "12px", sm: "13px", md: "14px" } } }>
                                        { a.user.fullName }
                                    </TableCell>

                                    <TableCell sx={ { px: { xs: 1.5, sm: 2, md: 3 }, fontSize: { xs: "12px", sm: "13px", md: "14px" } } }>
                                        { a.job.requiredSkills.slice( 0, 3 ).join( ", " ) }
                                        { a.job.requiredSkills.length > 3 ? "..." : "" }
                                    </TableCell>

                                    <TableCell sx={ { px: { xs: 1.5, sm: 2, md: 3 }, fontSize: { xs: "12px", sm: "13px", md: "14px" } } }>
                                        { a.job.company.location }
                                    </TableCell>

                                    <TableCell sx={ { px: { xs: 1.5, sm: 2, md: 3 }, fontSize: { xs: "12px", sm: "13px", md: "14px" } } }>
                                        { a.job.requiredExperience }
                                    </TableCell>

                                    <TableCell sx={ { px: { xs: 1.5, sm: 2, md: 3 } } }>
                                        <FormControl size="small" sx={ { minWidth: 140 } }>
                                            <Select
                                                value={ currentStatus }
                                                onChange={ ( e ) => handleStatusChange( a.id, e.target.value ) }
                                                disabled={ isUpdating }
                                                renderValue={ ( value ) => (
                                                    <div className="flex items-center gap-1.5">
                                                        { isUpdating && <CircularProgress size={ 12 } sx={ { color: statusStyle.color } } /> }
                                                        <span style={ { fontSize: "12px", fontWeight: 500, color: statusStyle.color } }>
                                                            { formatStatus( value ) }
                                                        </span>
                                                    </div>
                                                ) }
                                                sx={ {
                                                    fontSize: { xs: "11px", sm: "12px", md: "13px" },
                                                    bgcolor: statusStyle.bg,
                                                    borderRadius: "20px",
                                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                                    "& .MuiSelect-icon": { color: statusStyle.color, fontSize: "18px" },
                                                } }
                                            >
                                                { STATUS_OPTIONS.map( ( opt ) => (
                                                    <MenuItem
                                                        key={ opt }
                                                        value={ opt }
                                                        sx={ { fontSize: "13px", fontWeight: 500, color: STATUS_COLORS[ opt ]?.color } }
                                                    >
                                                        { formatStatus( opt ) }
                                                    </MenuItem>
                                                ) ) }
                                            </Select>
                                        </FormControl>
                                    </TableCell>

                                    <TableCell sx={ { px: { xs: 1.5, sm: 2, md: 1.5 } } }>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={ () => handleViewClick( a ) }
                                            sx={ {
                                                textTransform: "capitalize",
                                                borderRadius: "50px",
                                                px: { xs: 1.5, sm: 2, md: 2.5 },
                                                py: 0.5,
                                                fontSize: { xs: "10px", sm: "11px", md: "12px" },
                                                borderColor: "#1a6079",
                                                color: "#1a6079",
                                                "&:hover": { borderColor: "#154f63", color: "#154f63", background: "#f0f9ff" },
                                            } }
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        } ) }
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack spacing={ 2 } sx={ { marginTop: 5 } } alignItems="center">
                <Pagination
                    count={ totalPages }
                    page={ page }
                    onChange={ ( _, value ) => setPage( value ) }
                    sx={ {
                        "& .MuiPaginationItem-root": { color: "#1a6079" },
                        "& .MuiPaginationItem-root.Mui-selected": { backgroundColor: "#1a6079", color: "#fff" },
                    } }
                />
            </Stack>

            <ApplicantDetailModal
                open={ modalOpen }
                handleClose={ () => setModalOpen( false ) }
                applicant={ selectedApplicant }
            />
        </>
    );
};

export default ApplicantTable;