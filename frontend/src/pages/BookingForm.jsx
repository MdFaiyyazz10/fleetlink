import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  BookOnline,
  DirectionsCar,
  LocationOn,
  Schedule,
  Check,
  Person,
  ArrowForward,
} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { backend } from "../App"
import axios from "axios"

const BookingForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: "", severity: "info" })

  const [bookingData, setBookingData] = useState({
  vehicle: location.state?.vehicle ,
  searchCriteria: location.state?.searchCriteria ,
  customerId: "CUST-12345", 
})

// console.log("BOOKING DATA" , bookingData)

  const steps = ["Review Details", "Confirm Booking", "Booking Complete"]

  const handleNext = async () => {
    if (activeStep === 1) {
      setLoading(true)
      try {
        const response = await axios.post(
          `${backend}/bookings`,
          {
            vehicleId: bookingData.vehicle._id,
            customerId: bookingData.customerId,
            fromPincode: bookingData.searchCriteria.fromPincode,
            toPincode: bookingData.searchCriteria.toPincode,
            startTime: bookingData.searchCriteria.startTime,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const result = response.data

        setActiveStep((prev) => prev + 1)
        setAlert({
          open: true,
          message: "Booking confirmed successfully!",
          severity: "success",
        })

       
      } catch (error) {
        setAlert({
          open: true,
          message:
            error.response?.data?.message ||
            "Something went wrong while booking.",
          severity: "error",
        })
        console.error("Booking Error:", error)
      } finally {
        setLoading(false)
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  const handleReturnToSearch = () => {
    navigate("/")
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Vehicle Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsCar />
                      </ListItemIcon>
                      <ListItemText primary="Vehicle Name" secondary={bookingData.vehicle.name} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsCar />
                      </ListItemIcon>
                      <ListItemText primary="Capacity" secondary={`${bookingData.vehicle.capacityKg} KG`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsCar />
                      </ListItemIcon>
                      <ListItemText primary="Number of Tyres" secondary={bookingData.vehicle.tyres} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Journey Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText primary="From Pincode" secondary={bookingData.searchCriteria.fromPincode} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowForward />
                      </ListItemIcon>
                      <ListItemText primary="To Pincode" secondary={bookingData.searchCriteria.toPincode} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule />
                      </ListItemIcon>
                      <ListItemText
                        primary="Start Time"
                        secondary={format(new Date(bookingData.searchCriteria.startTime), "PPP p")}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule />
                      </ListItemIcon>
                      <ListItemText
                        primary="Estimated Duration"
                        secondary={`${bookingData.vehicle.estimatedRideDurationHours} hours`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText primary="Customer ID" secondary={bookingData.customerId} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Please confirm your booking details
            </Typography>
            <Typography variant="body1" paragraph>
              You are about to book <strong>{bookingData.vehicle.name}</strong> for a journey from{" "}
              <strong>{bookingData.searchCriteria.fromPincode}</strong> to{" "}
              <strong>{bookingData.searchCriteria.toPincode}</strong>.
            </Typography>
            <Typography variant="body1" paragraph>
              The journey will start at{" "}
              <strong>{format(new Date(bookingData.searchCriteria.startTime), "PPP p")}</strong> and is estimated to
              take <strong>{bookingData.vehicle.estimatedRideDurationHours} hours</strong>.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              By clicking "Confirm Booking", you agree to the terms and conditions of FleetLink.
            </Typography>
          </Box>
        )
      case 2:
        return (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Check sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
            <Typography variant="h5" gutterBottom color="success.main">
              Booking Confirmed!
            </Typography>
            <Typography variant="body1" paragraph>
              Your booking reference is: <strong>BK-{Math.floor(Math.random() * 10000)}</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              The vehicle <strong>{bookingData.vehicle.name}</strong> has been booked for your journey.
            </Typography>
            <Typography variant="body1" paragraph>
              A confirmation email has been sent to your registered email address.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleReturnToSearch} sx={{ mt: 2 }}>
              Return to Search
            </Button>
          </Box>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <BookOnline sx={{ mr: 1 }} /> Book Vehicle
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, mb: 4 }}>{renderStepContent(activeStep)}</Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0 || activeStep === steps.length - 1}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1 || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {activeStep === steps.length - 2 ? "Confirm Booking" : "Next"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default BookingForm
