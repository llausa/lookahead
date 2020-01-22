import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SignUpForm() {

 
  const inputStyle = {
    margin: "4px",
  }

  const buttonMain = {
    color: "#2baafe",
    margin: "20px",
    border: "1px solid rgb(43, 170, 254)"
  }

  const [token, dispatchToken] = useReducer(stateReducer, null)

  const [userEmail, setUserEmail] = useState()


onFormSubmit = async event => {
  event.preventDefault();
  const { email, password } = this.state;

  try {
    const response = await axios.post("http://localhost:3001/auth/register", {
      email,
      password
    });
    this.props.onRegisterFormSubmit(response.data.token, () =>
      this.props.history.push("/")
    );
  } catch (error) {
    this.setState({ error });
  }
};

  return(
    <form>
      <TextField
          style={inputStyle}
          required
          id="outlined-required"
          label="First Name"
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <TextField
          style={inputStyle}
          required
          id="outlined-required"
          label="Last Name"
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <TextField
          style={inputStyle}
          id="outlined"
          label="Position"
          defaultValue=""
          variant="outlined"
          size="small"
        />

        <p style={{fontSize:"12px", margin:"10px"}}>Please enter your Email and Password</p>

        <TextField
          style={inputStyle}
          required
          id="outlined"
          label="Email"
          defaultValue=""
          variant="outlined"
          size="small"
        />

        <TextField
        style={inputStyle}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          size="small"
        />
        <TextField
        style={inputStyle}
          required
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          size="small"
        />

        <Button onClick={SignupPressed} variant="outlined" style={buttonMain} color="primary">Signup</Button>
        </form>
  )
}

export default SignUpForm