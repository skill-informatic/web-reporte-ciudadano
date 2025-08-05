import { FieldValue, Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export interface TypeUserInfo {
  id_user?: string;
  email: string;
  phone: string;
  role: "admin" | "supervisor" | "user";
  created_at: string;
  updated_at: string | unknown;
  city: string;
  state: string;
}
export type UserUpdateInfo = Omit<TypeUserInfo, "created_at" | "role">;
export interface Context {
  user_info: TypeUserInfo;
  report_info: TypesData;
  place_info: TypesDataPlace;
  initial_coords: [number, number];
}

export type typeSessionOptionsError = {
  "auth/wrong-password": string;
  "auth/user-not-found": string;
  "auth/invalid-email": string;
  "auth/too-many-requests": string;
  "auth/network-request-failed": string;
  "auth/invalid-credential": string;
  default: string;
};
export const sessionOptionsError: typeSessionOptionsError = {
  "auth/wrong-password":
    "La contraseña es incorrecta. Por favor, inténtalo de nuevo.",
  "auth/user-not-found":
    "No se encontró una cuenta con este correo electrónico.",
  "auth/invalid-email": "El formato del correo electrónico no es válido.",
  "auth/too-many-requests":
    "Demasiados intentos de inicio de sesión. Por favor, inténtalo más tarde.",
  "auth/network-request-failed":
    "Error de red. Verifica tu conexión a internet.",
  "auth/invalid-credential": "Tu usuario no existe o tu contraseña es invalida",
  default: "Ocurrió un error desconocido. Por favor, inténtalo de nuevo.",
};

export type typeRegisterOptionsError = {
  "auth/email-already-in-use": string;
  "auth/invalid-email": string;
  "auth/weak-password": string;
  "auth/missing-password": string;
  "auth/user-disabled": string;
  "auth/operation-not-allowed": string;
  "auth/network-request-failed": string;
  "auth/too-many-requests": string;
  "auth/internal-error": string;
  "firestore/permission-denied": string;
  "firestore/unavailable": string;
  "firestore/invalid-argument": string;
  "firestore/not-found": string;
  "firestore/aborted": string;
  "firestore/unknown": string;
  "generic/unknown": string;
  default: string;
};

export const registerOptionsError: typeRegisterOptionsError = {
  "auth/email-already-in-use":
    "Este correo electrónico ya está registrado. Usa otro o intenta iniciar sesión.",
  "auth/invalid-email":
    "El formato del correo electrónico no es válido. Por favor, verifica e intenta de nuevo.",
  "auth/weak-password":
    "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.",
  "auth/missing-password": "Debes proporcionar una contraseña para continuar.",
  "auth/user-disabled":
    "Esta cuenta ha sido deshabilitada. Contacta al administrador para más información.",
  "auth/operation-not-allowed":
    "El registro con correo electrónico y contraseña no está habilitado. Contacta al administrador.",
  "auth/network-request-failed":
    "Hubo un problema con la conexión a internet. Por favor, verifica tu red e intenta de nuevo.",
  "auth/too-many-requests":
    "Has intentado muchas veces en poco tiempo. Por favor, espera unos minutos e intenta de nuevo.",
  "auth/internal-error":
    "Ocurrió un error interno. Intenta más tarde o contacta soporte.",
  "firestore/permission-denied":
    "No tienes permisos para realizar esta acción. Contacta al administrador.",
  "firestore/unavailable":
    "El servicio de Firestore no está disponible. Verifica tu conexión a internet.",
  "firestore/invalid-argument":
    "Los datos proporcionados no son válidos. Verifica e intenta de nuevo.",
  "firestore/not-found":
    "El documento solicitado no existe en la base de datos.",
  "firestore/aborted":
    "La operación fue cancelada. Por favor, intenta de nuevo.",
  "firestore/unknown":
    "Ocurrió un error desconocido. Intenta más tarde o contacta soporte.",
  "generic/unknown":
    "Ocurrió un error inesperado. Intenta más tarde o contacta soporte.",
  default:
    "Ocurrió un error desconocido. Intenta más tarde o contacta soporte.",
};

export interface CardTypes {
  id: string;
  name: string;
  route: string;
  icono: React.JSX.Element | string | ReactNode;
  subtitle?: string;
}
export const UploadImageErrors = {
  NO_IMAGE: "No hay imagen para subir",
  UPLOAD_FAILED: "Error al subir la imagen",
  URL_FAILED: "Error al obtener la URL de la imagen",
  UNKNOWN: "Error desconocido",
} as const;
export const errorMessages: { [key: string]: string } = {
  "permission-denied": "No tienes permisos para realizar esta acción.",
  unavailable:
    "El servicio no está disponible en este momento. Inténtalo más tarde.",
  "not-found": "No se encontraron datos.",
  "already-exists": "El registro ya existe y no puede duplicarse.",
  "invalid-argument": "Los datos proporcionados no son válidos.",
  "deadline-exceeded": "La operación tardó demasiado en responder.",
  unauthenticated: "No estás autenticado. Inicia sesión para continuar.",
  "resource-exhausted": "Se ha alcanzado el límite de uso permitido.",
  aborted: "La operación fue cancelada. Intenta nuevamente.",
  unknown: "Ha ocurrido un error inesperado. Intenta más tarde.",

  // Errores específicos para GET
  "failed-precondition":
    "No se cumplen los requisitos para obtener la información.",
  "data-loss": "Los datos están corruptos o se han perdido.",

  // Errores específicos para POST
  "out-of-range": "Los datos proporcionados están fuera del rango permitido.",
  "already-in-use": "La información que intentas registrar ya está en uso.",
  "invalid-data": "Los datos enviados no son correctos.",

  // Errores específicos para PUT
  "not-updatable": "No se puede actualizar la información.",
  "failed-update": "No se pudo completar la actualización.",
  conflict: "Hubo un conflicto con los datos proporcionados.",
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/user-disabled": "Esta cuenta ha sido deshabilitada.",
  "auth/user-not-found": "Usuario no encontrado.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/email-already-in-use": "Este correo ya está registrado.",
  "auth/weak-password": "La contraseña es demasiado débil.",
  internal: "Error interno del servidor. Intenta más tarde.",
};
export interface TypeCoord {
  latitude: number;
  longitude: number;
}

export type TypesDataPost = {
  title: string;
  content: string;
  category: string;
  image_url: string;
  coords: TypeCoord;
  phone: string;
  id_user: string;
  city: string;
  state: string;
  location?: unknown;
  // "pendiente" | "en_proceso" | "finalizado";
  status: string;
  geohash?: string;
  created_at: string | FieldValue | Timestamp;
};

export interface TypesData extends TypesDataPost {
  id: string;
  updated_at?: string;
}
export interface TypesCategory {
  value: string;
  label: string;
}

export interface TypeCommentary {
  id?: string;
  id_user?: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}
export interface TypeCommentaryPost extends TypeCommentary {
  id_report?: string;
}
export interface TypeCommentaryPostPlace extends TypeCommentaryPost {
  id_place?: string;
}

export interface TypeNews {
  id_user: string;
  image_url: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  category: string;
  updated_at: string;
  state: string;
  city: string;
  phone: number;
  coords: { latitude: number; longitude: number };
}
export interface TypeNewsGet extends TypeNews {
  id: string;
}

export type TypesDataPostPlaces = {
  title: string;
  content: string;
  category: string;
  image_url: string;
  coords: { latitude: number; longitude: number };
  phone: string;
  id_user: string;
  city: string;
  state: string;
  status: "close" | "open";
  location?: unknown;
  geohash?: string;
  created_at?: string | FieldValue | Timestamp;
};

export interface TypesDataPlace extends TypesDataPostPlaces {
  id: string;
  updated_at?: string;
}
