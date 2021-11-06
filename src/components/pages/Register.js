import { Box, Button, Container, Grid, TextField, Typography,CircularProgress } from "@mui/material";
import { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import loginImg from "../../assets/images/login.png";
import useAuth from "../../hooks/useAuth";

export default function Register() {
    const [registerData, setRegisterData] = useState({});

    const {registerUser, setIsLoading,isLoading } = useAuth()

    //Router History
  const history = useHistory();

    //Collect the all Data on One Function
    const handleChange = e =>{
        const field = e.target.name;
        const value = e.target.value;

        const newData = {...registerData}
        newData[field] = value;
        
        setRegisterData(newData)
    }

    const handleSubmit = (e) =>{

        if(registerData.password !== registerData.confirm_password){
          alert('Password Did not match')
          return;
        }

        const {email, password , name} = registerData;

        // console.log(password, email)

        //register
        registerUser(email, password, name)
        .then(user => {
          history.push('/')
        })
        .finally(() =>{
          setIsLoading(false)
        })


        e.preventDefault()
    }

  return (
    <Container>
      <Box sx={{ flexGrow: 1, height: "100vh" }}>
        <Grid container spacing={2} sx={{alignItems: 'center'}}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align='center' color="" component="h5">
              Register
            </Typography>
            {
            !isLoading && <form onSubmit={handleSubmit} mt={2}>
            <TextField
              type='text'
                id="standard-basic"
                label="Full name"
                name='name'
                variant="standard"
                sx={{width:'100%'}}
                onChange={handleChange}
              />
              <TextField
              type='email'
                id="standard-basic"
                label="User Email"
                name='email'
                variant="standard"
                sx={{width:'100%'}}
                onChange={handleChange}
              />
              <br/>
              <br/>
              <TextField
              type='password'
                id="standard-basic"
                label="Password"
                name='password'
                variant="standard"
                sx={{width:'100%'}}
                onChange={handleChange}
              />
              <br/>
              <br/>
              <TextField
              type='password'
                id="standard-basic"
                label="Confirm Password"
                name='confirm_password'
                variant="standard"
                sx={{width:'100%'}}
                onChange={handleChange}
              />
              <Button sx={{mt: 2}} type='submit' variant='contained' size='large' color='success'>Register</Button>
              <br></br>
              <NavLink to='/login'  >
                <Button sx={{mt: 2}} variant='text'>Already Have A Account? Login</Button>
              </NavLink>
            </form>}
            {
              isLoading && <CircularProgress color="success" />

            }
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: "100%" }} src={loginImg} alt="login" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
