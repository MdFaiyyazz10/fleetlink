import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material"
import { Search, LocalShipping, Schedule, LocationOn, MyLocation, BookOnline } from "@mui/icons-material"
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { backend } from "../App"
import Loader from "../components/Loader"

const SearchBook = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: "", severity: "info" })
  const [searchForm, setSearchForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: new Date(),
  })
  const [availableVehicles, setAvailableVehicles] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchForm({
      ...searchForm,
      [name]: name === "capacityRequired" ? Number(value) : value,
    })
  }

  const handleDateChange = (newValue) => {
    setSearchForm({
      ...searchForm,
      startTime: newValue,
    })
  }

 const handleSearch = async (e) => {
  e.preventDefault()
  setLoading(true)

  if (!searchForm.capacityRequired || !searchForm.fromPincode || !searchForm.toPincode) {
    setAlert({
      open: true,
      message: "Please fill all required fields",
      severity: "error",
    })
    setLoading(false)
    return
  }

  try {
    const res = await axios.get(`${backend}/vehicles/available`, {
      params: {
        capacityRequired: searchForm.capacityRequired,
        fromPincode: searchForm.fromPincode,
        toPincode: searchForm.toPincode,
        startTime: searchForm.startTime.toISOString(),
      },
    })

    const { availableVehicles, estimatedRideDurationHours } = res.data

    const vehiclesWithDuration = availableVehicles.map((v) => ({
      ...v,
      estimatedRideDurationHours,
    }))

    setAvailableVehicles(vehiclesWithDuration)
    setSearchPerformed(true)

    if (vehiclesWithDuration.length === 0) {
      setAlert({
        open: true,
        message: "No vehicles available matching your criteria",
        severity: "info",
      })
    }
  } catch (error) {
    console.error(error)
    setAlert({
      open: true,
      message: "Failed to search vehicles",
      severity: "error",
    })
  } finally {
    setLoading(false)
  }
}


  const handleBookNow = (vehicle) => {
   navigate("/booking-form", {
  state: {
    vehicle,
    searchCriteria: searchForm,
  },
})

   
    setAlert({
      open: true,
      message: `Navigating to booking form for ${vehicle.name}`,
      severity: "success",
    })
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  return (
<>
    {loading && <Loader />}
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Search sx={{ mr: 1 }} /> Search Available Vehicles
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="capacity-required">Capacity Required</InputLabel>
                <OutlinedInput
                  id="capacity-required"
                  name="capacityRequired"
                  type="number"
                  value={searchForm.capacityRequired}
                  onChange={handleChange}
                  endAdornment={<InputAdornment position="end">KG</InputAdornment>}
                  label="Capacity Required"
                  required
                  inputProps={{ min: 0 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="From Pincode"
                name="fromPincode"
                value={searchForm.fromPincode}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MyLocation fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="To Pincode"
                name="toPincode"
                value={searchForm.toPincode}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Date & Time"
                  value={searchForm.startTime}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                  minDateTime={new Date()}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                size="large"
              >
                {loading ? "Searching..." : "Search Availability"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {searchPerformed && (
        <>
          <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <LocalShipping sx={{ mr: 1 }} /> Available Vehicles
          </Typography>

          <Grid container spacing={3}>
            {availableVehicles.length > 0 ? (
              availableVehicles.map((vehicle) => (
                <Grid item xs={12} md={4} key={vehicle.id}>
                  <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {vehicle.name}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                          <strong>Capacity:</strong> {vehicle.capacityKg} KG
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                          <strong>Tyres:</strong> {vehicle.tyres}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Schedule fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body1">
                            <strong>Estimated Duration:</strong> {vehicle.estimatedRideDurationHours} hours
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Chip label="Available" color="success" size="small" sx={{ fontWeight: "bold" }} />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleBookNow(vehicle)}
                        startIcon={<BookOnline />}
                      >
                        Book Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary">
                    No vehicles available matching your criteria
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    Try adjusting your search parameters
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </>
      )}

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
    </>
  )
}

export default SearchBook
