import { AppContainer } from "./styles";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import React from "react";
import { useAuthContext } from "../../contexts";
import loginImage from "../../media/login.svg";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});
interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // const { toggleTheme } = useAppThemeContext();
  // const { logout } = useAuthContext();

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <AppContainer>
      <>
        {/* caixa de dialodo */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Bem-vindo à sua Incoflandres!</h3>
              <p>
                “A única maneira de alcançar o <br />
                impossível é acreditar que é possível.”
                <br />– Charles Kingsleigh
              </p>
            </div>
            <img
              src={loginImage}
              className="image"
              height={388}
              width={562}
              alt=""
            />
          </div>

          <Box>
            <Card>
              <CardContent>
                <br></br>
                <br></br>
                <br></br>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={5}
                  width={300}
                  zIndex="2"
                  left="12%"
                  height="400px"
                  position="relative"
                >
                  <Typography variant="h6" align="center">
                    <img
                      // src="https://media.glassdoor.com/sqll/2491087/cinbal-squarelogo-1554782944622.png"
                      width="10%"
                    />
                    <br></br>
                    Identifique-se
                  </Typography>

                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    value={email}
                    disabled={isLoading}
                    error={!!emailError}
                    helperText={emailError}
                    onKeyDown={() => setEmailError("")}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={password}
                    disabled={isLoading}
                    error={!!passwordError}
                    helperText={passwordError}
                    onKeyDown={() => setPasswordError("")}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
              </CardContent>

              <CardActions>
                <Box width="100%" display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    endIcon={
                      isLoading ? (
                        <CircularProgress
                          variant="indeterminate"
                          color="inherit"
                          size={20}
                        />
                      ) : undefined
                    }
                  >
                    Entrar
                  </Button>
                </Box>
              </CardActions>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </Card>
          </Box>
        </div>
      </>
    </AppContainer>
  );
};
