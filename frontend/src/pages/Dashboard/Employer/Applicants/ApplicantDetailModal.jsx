import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";


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



const ApplicantDetailModal = ( { open, handleClose, applicant } ) =>
{
    if ( !applicant ) return null;

    const { user, job, status, appliedDate, coverLetter, resumeUrl } = applicant;
    const statusStyle = STATUS_COLORS[ status ] || STATUS_COLORS.APPLIED;



    const formatDate = ( dateStr ) =>
    {
        if ( !dateStr ) return "—";
        return new Date( dateStr ).toLocaleDateString( "en-IN", {
            day: "2-digit", month: "short", year: "numeric",
        } );
    };


    const InfoRow = ( { icon, label, value } ) => (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">{ icon }</div>
            <div>
                <p className="text-[11px] text-gray-400 mb-0.5">{ label }</p>
                <p className="text-[13px] text-gray-700 font-medium">{ value || "—" }</p>
            </div>
        </div>
    );
    return (
        <Modal open={ open } onClose={ handleClose }>
            <Box
                sx={ {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "95vw", sm: 560, md: 680 },
                    maxHeight: "85vh",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 4,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                } }
            >
                <Box
                    sx={ {
                        px: { xs: 3, sm: 4 },
                        pt: 3,
                        pb: 2.5,
                        background: "linear-gradient(135deg, #1a6079 0%, #0e3f52 100%)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    } }
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                style={ {
                                    width: 48, height: 48, borderRadius: "50%",
                                    background: "rgba(255,255,255,0.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "20px", fontWeight: 700, color: "#fff", flexShrink: 0,
                                } }
                            >
                                { user?.fullName?.charAt( 0 )?.toUpperCase() }
                            </div>
                            <div>
                                <h2 style={ { color: "#fff", fontSize: "18px", fontWeight: 600, margin: 0 } }>
                                    { user?.fullName }
                                </h2>
                                <p style={ { color: "rgba(255,255,255,0.75)", fontSize: "13px", margin: 0 } }>
                                    { user?.email }
                                </p>
                            </div>
                        </div>
                        <Chip
                            label={ formatStatus( status ) }
                            size="small"
                            sx={ { mt: 1.5, bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 600, fontSize: "11px" } }
                        />
                    </div>
                    <IconButton onClick={ handleClose } size="small" sx={ { color: "rgba(255,255,255,0.8)", mt: -0.5 } }>
                        <CancelOutlinedIcon />
                    </IconButton>
                </Box>

                <Box sx={ { overflowY: "auto", px: { xs: 3, sm: 4 }, py: 3, flex: 1 } }>

                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        Applicant Details
                    </p>
                    <div className="flex flex-col gap-3">
                        <InfoRow icon={ <PersonOutlineIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Full Name" value={ user?.fullName } />
                        <InfoRow icon={ <EmailOutlinedIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Email" value={ user?.email } />
                        <InfoRow icon={ <CalendarTodayOutlinedIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Applied On" value={ formatDate( appliedDate ) } />
                    </div>

                    <Divider sx={ { my: 3 } } />

                    {/* Job Info */ }
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        Job Details
                    </p>
                    <div className="flex flex-col gap-3">
                        <InfoRow icon={ <WorkOutlineIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Job Title" value={ job?.title } />
                        <InfoRow icon={ <LocationOnOutlinedIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Location" value={ job?.company?.location } />
                        <InfoRow icon={ <WorkOutlineIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Experience Required" value={ job?.requiredExperience } />
                        <InfoRow icon={ <WorkOutlineIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Job Type" value={ job?.timing } />
                        <InfoRow icon={ <WorkOutlineIcon sx={ { fontSize: 18, color: "#1a6079" } } /> } label="Avg. Salary" value={ job?.avgSalary } />
                    </div>

                    { job?.requiredSkills?.length > 0 && (
                        <>
                            <Divider sx={ { my: 3 } } />
                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                Required Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                { job.requiredSkills.map( ( skill, i ) => (
                                    <Chip
                                        key={ i }
                                        label={ skill }
                                        size="small"
                                        sx={ { bgcolor: "#dbeafe", color: "#1d4ed8", fontWeight: 500, fontSize: "12px" } }
                                    />
                                ) ) }
                            </div>
                        </>
                    ) }

                    { coverLetter && (
                        <>
                            <Divider sx={ { my: 3 } } />
                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                Cover Letter
                            </p>
                            <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-4 border border-gray-100">
                                { coverLetter }
                            </p>
                        </>
                    ) }

                    { resumeUrl && (
                        <>
                            <Divider sx={ { my: 3 } } />
                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                Resume
                            </p>
                            <a href={ resumeUrl } target="_blank" rel="noreferrer">
                                <Button
                                    variant="outlined"
                                    startIcon={ <AttachFileOutlinedIcon /> }
                                    sx={ {
                                        textTransform: "capitalize",
                                        borderColor: "#1a6079",
                                        color: "#1a6079",
                                        borderRadius: "10px",
                                        fontSize: "13px",
                                        "&:hover": { borderColor: "#154f63", background: "#f0f9ff" },
                                    } }
                                >
                                    View Resume
                                </Button>
                            </a>
                        </>
                    ) }

                </Box>
            </Box>
        </Modal>
    );
}

export default ApplicantDetailModal