import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material"
import { DirectionsCar, Add } from "@mui/icons-material"
import axios from "axios"
import { backend } from "../App"
import toast from "react-hot-toast"

const AddVehicle = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" })
  const [formData, setFormData] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  })

  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`${backend}/all-vehicle`)
      setVehicles(res.data)
    } catch (err) {
      console.error("Error fetching vehicles", err)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchVehicle().finally(() => setLoading(false))
  }, []) 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "capacityKg" || name === "tyres" ? Number(value) : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.name || !formData.capacityKg || !formData.tyres) {
      setAlert({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      })
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(`${backend}/vehicles`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      const newVehicle = res.data.vehicle
      toast.success(res.data.message)

      setVehicles((prev) => [...prev, newVehicle])
      setFormData({ name: "", capacityKg: "", tyres: "" })

      setAlert({
        open: true,
        message: "Vehicle added successfully!",
        severity: "success",
      })
    } catch (error) {
      console.error("Error adding vehicle:", error)

      setAlert({
        open: true,
        message: error?.response?.data?.message || "Failed to add vehicle",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <DirectionsCar sx={{ mr: 1 }} /> Add New Vehicle
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Vehicle Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Capacity (KG)"
                name="capacityKg"
                type="number"
                value={formData.capacityKg}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Number of Tyres"
                name="tyres"
                type="number"
                value={formData.tyres}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Add />}
              >
                {loading ? "Adding..." : "Add Vehicle"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Vehicle Fleet
      </Typography>

      {loading && vehicles.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Capacity (KG)</TableCell>
                <TableCell>Tyres</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <TableRow key={vehicle._id} hover>
                    <TableCell>{vehicle._id}</TableCell>
                    <TableCell>{vehicle.name}</TableCell>
                    <TableCell>{vehicle.capacityKg}</TableCell>
                    <TableCell>{vehicle.tyres}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No vehicles found. Add your first vehicle above.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
  )
}

export default AddVehicle
