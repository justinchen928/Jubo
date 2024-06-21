import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePatientContext } from "../context/PatientContext";

const OrderEditDialog = () => {
  const {
    selectedOrder,
    orderMessage,
    isOrderDialogOpen,
    handleOrderDialogClose,
    handleOrderChange,
    handleSaveOrder,
  } = usePatientContext();

  return (
    <Dialog
      onClose={handleOrderDialogClose}
      aria-labelledby="order-dialog-title"
      open={isOrderDialogOpen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="order-dialog-title">
        {selectedOrder ? "Edit Order" : "Add Order"}
        <IconButton
          aria-label="close"
          onClick={handleOrderDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Order Message"
          value={orderMessage}
          onChange={handleOrderChange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSaveOrder}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderEditDialog;
