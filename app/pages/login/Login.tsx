import {
    Form,
    useActionData,
    useNavigation,
} from "react-router";

import type { Route } from "../../routes/+types/login";

import {
    Card,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
} from "@mui/material";

export function Login() {

    const actionData =
        useActionData<typeof import("../../routes/login").action>();

    const navigation = useNavigation();

    const isSubmitting =
        navigation.state === "submitting";

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Card
                        sx={{
                            paddingX: 4,
                            paddingY: 2,
                            mt: 4,
                        }}
                    >

                        <Form method="post" action="/login">

                            <Typography
                                variant="h5"
                                sx={{
                                    py: 2,
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                Conta Alerta
                            </Typography>

                            {actionData?.error && (
                                <Alert severity="error">
                                    {actionData.error}
                                </Alert>
                            )}

                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                name="email"
                                required
                                sx={{ marginBottom: 2 }}
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                name="password"
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Entrando..."
                                        : "Entrar"}
                                </Button>
                            </Box>

                        </Form>

                    </Card>
                </Box>

            </div>
        </div>
    );
}