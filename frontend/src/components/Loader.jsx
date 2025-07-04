import { Box, Typography, CircularProgress, LinearProgress } from "@mui/material"
import { LocalShipping, Speed, Route } from "@mui/icons-material"
import { keyframes } from "@mui/system"


const truckMove = keyframes`
  0% {
    transform: translateX(-100px);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(-100px);
  }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const Loader = ({ message = "Loading FleetLink...", showProgress = false, progress = 0 }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        color: "white",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          animation: `${pulse} 3s ease-in-out infinite`,
          opacity: 0.1,
        }}
      >
        <Speed sx={{ fontSize: 60 }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "15%",
          animation: `${pulse} 2s ease-in-out infinite`,
          opacity: 0.1,
          animationDelay: "1s",
        }}
      >
        <Route sx={{ fontSize: 80 }} />
      </Box>

    
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textAlign: "center",
        }}
      >
       
        <Box
          sx={{
            position: "relative",
            width: 200,
            height: 100,
            mb: 2,
          }}
        >
          <LocalShipping
            sx={{
              fontSize: 80,
              animation: `${truckMove} 3s ease-in-out infinite`,
              color: "white",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />
          
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 1,
            }}
          />
        </Box>

       
        <Box sx={{ animation: `${bounce} 2s ease-in-out infinite` }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              letterSpacing: "2px",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              mb: 1,
            }}
          >
            FleetLink
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              opacity: 0.9,
              letterSpacing: "4px",
              fontSize: "0.9rem",
            }}
          >
            LOGISTICS PLATFORM
          </Typography>
        </Box>

       
        <Typography
          variant="h6"
          sx={{
            opacity: 0.8,
            fontWeight: 300,
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        >
          {message}
        </Typography>

       
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "rgba(255,255,255,0.8)",
              animation: `${pulse} 1.5s ease-in-out infinite`,
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocalShipping sx={{ fontSize: 24, opacity: 0.7 }} />
          </Box>
        </Box>

        
        {showProgress && (
          <Box sx={{ width: 300, mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "white",
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, opacity: 0.7 }}>
              {progress}% Complete
            </Typography>
          </Box>
        )}

       
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.6)",
                animation: `${bounce} 1.4s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </Box>
      </Box>

     
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 30,
          opacity: 0.5,
          letterSpacing: "1px",
        }}
      >
        Powering Your Logistics Journey
      </Typography>
    </Box>
  )
}

export default Loader
