import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const PatientCard = ({ patient, onViewClick }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="textSecondary">
              Patients ID: {patient.id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Gender: {patient.gender}
            </Typography>
            <Typography variant="h6" color="textPrimary">
              Name: {patient.name}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onViewClick(patient)}
            style={{ marginLeft: "auto" }}
          >
            Orders
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
