import { Typography, Container, Card, CardContent, Button, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ textAlign: "center", p: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <LockOutlinedIcon color="error" sx={{ fontSize: 60 }} />
          </Box>
          <Typography variant="h4" color="error" gutterBottom>
            403 - Unauthorized
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            You do not have permission to access this page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
