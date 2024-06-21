import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import PatientCard from "./components/PatientCard";
import OrderListDialog from "./components/OrderListDialog";
import OrderEditDialog from "./components/OrderEditDialog";
import { PatientProvider, usePatientContext } from "./context/PatientContext";

const AppContent = () => {
  const { patients, handleViewClick } = usePatientContext();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patients List
      </Typography>
      <Grid container spacing={2} direction="column">
        {patients.map((patient) => (
          <Grid item key={patient.id}>
            <PatientCard patient={patient} onViewClick={handleViewClick} />
          </Grid>
        ))}
      </Grid>
      <OrderListDialog />
      <OrderEditDialog />
    </Container>
  );
};

const App = () => {
  return (
    <PatientProvider>
      <AppContent />
    </PatientProvider>
  );
};

export default App;
