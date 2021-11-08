import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import loginImg from "../../assets/images/login.png";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithGoogle, setError, logIn , setIsLoading, saveUser} = useAuth();

  //Router History
  const history = useHistory();
  const location = useLocation()

  const redirect_Uri = location.state?.from || '/';

  //Google Logon
  const handleRedirect = () => {
    signInWithGoogle()
      .then((result) => {
        history.push(redirect_Uri);
        saveUser(result.user.displayName, result.user.email, 'PUT')
      })
      .catch((error) => setError(error.message));
  };

  //Email password login
  const handleSubmit = (e) => {
    logIn(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        history.push("/");
      })
      .catch((error) => setError(error.message)).finally(()=>{
        setIsLoading(true)
      })

    e.preventDefault();
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, height: "100vh" }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" color="" component="h5">
              Login
            </Typography>
            <form onSubmit={handleSubmit} mt={2}>
              <TextField
                type="email"
                id="standard-basic"
                label="User Email"
                name="email"
                variant="standard"
                sx={{ width: "100%" }}
                onBlur={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />
              <TextField
                type="password"
                id="standard-basic"
                label="Password"
                name="password"
                variant="standard"
                sx={{ width: "100%" }}
                onBlur={(e) => setPassword(e.target.value)}
              />
              <Button
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                size="large"
                color="success"
              >
                Sign in
              </Button>
              <br />
              <NavLink to="/register">
                <Button sx={{ mt: 2 }} variant="text">
                  New User? Register
                </Button>
              </NavLink>
              <br />
              <Button onClick={handleRedirect} variant="contained">
                Login in using google
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: "100%" }} src={loginImg} alt="login" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}