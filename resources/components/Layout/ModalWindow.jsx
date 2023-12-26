import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { generatePath } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import LinkButton from "../Button/LinkButton";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
};

export default function ModalWindow({
    modalMessage,
    open,
    setOpen,
    modalHeader,
}) {
    //I leave it here, because I want to ask a question about rendering
    // console.log("ok");

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Button
                    onClick={() => setOpen(false)}
                    sx={{
                        justifyContent: "flex-end",
                        ":hover": {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <CloseIcon />
                </Button>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {modalHeader}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                    {modalMessage}
                </Typography>
                <LinkButton
                    to={generatePath("/:id/songs", {
                        id: 1,
                    })}
                >
                    Chansons d'aujourd'hui
                </LinkButton>
            </Box>
        </Modal>
    );
}
