import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { usePatientContext } from "../context/PatientContext";

const OrderListDialog = () => {
  const {
    orders,
    selectedPatient,
    isDialogOpen,
    handleDialogClose,
    handleAddOrderClick,
    handleOrderItemClick,
  } = usePatientContext();

  return (
    <Dialog
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Patient Order</Typography>
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Patients ID"
            value={selectedPatient?.id || ""}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
          <Box mx={1} />
          <TextField
            label="Patients Name"
            value={selectedPatient?.name || ""}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Orders</Typography>
          <IconButton
            aria-label="add"
            onClick={handleAddOrderClick}
            sx={{
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.shadows[3],
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2} direction="column" mt={2}>
          {orders.map((order) => (
            <Grid item key={order.id}>
              <Card>
                <CardActionArea onClick={() => handleOrderItemClick(order)}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {order.last_updated_at}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {order.message}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default OrderListDialog;
