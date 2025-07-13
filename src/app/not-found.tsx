import { redirect } from "next/navigation";

export default function NotFound() {
  //Verificar que no aya usuario en el storage
  redirect("/views/login"); // 👈 cambia esta ruta a donde quieras redirigir
}
