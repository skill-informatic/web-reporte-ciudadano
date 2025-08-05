"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  changeAccountInfo,
  resetInitialCoords,
  resetLoginInfo,
} from "@/app/store/slices/context";
import { auth, putUserInfo } from "@/firebase/firebaseConfig";
import { logout } from "@/app/store/slices/user";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Page = () => {
  const dispatch = useDispatch();
  const user_info = useSelector((state: RootState) => state.context.user_info);

  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    ...user_info,
    email: user_info?.email || "",
    phone: user_info?.phone?.toString() || "",
  });

  const handleChange = (key: string, value: string) => {
    if (key === "phone" && value.length > 10) return;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (formData.phone.length !== 10) {
      alert("El número de teléfono debe tener exactamente 10 caracteres.");
      return;
    }
    dispatch(changeAccountInfo(formData));
    putUserInfo({ ...user_info, ...formData });
    setIsEditable(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(resetLoginInfo());
    dispatch(logout());
    dispatch(resetInitialCoords());
    router.push("/views/login");
  };

  return (
    <Box mt={"2.5rem"}>
      <Card sx={{ p: 3 }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => setIsEditable((prev) => !prev)}>
            {isEditable ? <Close /> : <Edit />}
          </IconButton>
        </Box>

        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Correo:
          </Typography>
          {isEditable ? (
            <TextField
              fullWidth
              margin="dense"
              value={formData.email}
              disabled
            />
          ) : (
            <Typography>{formData.email}</Typography>
          )}
        </Box>

        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Celular:
          </Typography>
          {isEditable ? (
            <TextField
              fullWidth
              margin="dense"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            <Typography>{formData.phone}</Typography>
          )}
        </Box>

        {isEditable ? (
          <Button fullWidth variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        ) : (
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        )}
      </Card>
    </Box>
  );
};

export default Page;
