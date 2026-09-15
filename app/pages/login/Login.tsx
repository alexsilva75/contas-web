import { useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { ApiError } from '../../../services/api';
import {useNavigate} from 'react-router';
import {Card, Typography, TextField, Button, Box } from '@mui/material';


export function Login() {
  const {isAuthenticated, login } = useAuth();

  if(isAuthenticated){
    return <Navigate to="/dashboard" replace />
  }
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: any) {
    event.preventDefault();

    setErro('');
    setCarregando(true);

    try {
      await login(email, senha);

      navigate('/dashboard', {replace: true})
      
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setErro('Email ou senha inválidos.');
      } else {
        setErro('Não foi possível realizar o login.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
          <Card sx={{paddingX: 4, paddingY: 2, mt: 4}}>
            
              <Typography variant='h5' sx={{py: 2, textAlign: 'center', fontWeight: 'bold'}}>
                Conta Alerta
              </Typography>

              {erro && (
                <div className="alert alert-danger">
                  {erro}
                </div>
              )}        
                  
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    sx={{marginBottom: 2}}
                  />                   

                  <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    required
                    sx={{mb: 2}}
                  />
                
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                    <Button
                        type="submit"
                        variant="contained"                  
                        disabled={carregando}
                    >
                    {carregando ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Box>
              
          </Card>
        </Box>
      </div>
    </div>
  );
}