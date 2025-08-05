/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the functions you need from the SDKs you need
import {
  errorMessages,
  TypeDataPost,
  TypeDataPostBeforePost,
  UploadImageErrors,
  TypeUserInfo,
} from "@/app/models/globalInfo.types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  GeoPoint,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { geohashForLocation } from "geofire-common";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg1Om99AdmRnZOywBcBAjxRQxStGOQFJs",
  authDomain: "reporte-ciudadano-23b56.firebaseapp.com",
  projectId: "reporte-ciudadano-23b56",
  storageBucket: "reporte-ciudadano-23b56.firebasestorage.app",
  messagingSenderId: "615611906155",
  appId: "1:615611906155:web:27101600c05e9f66c7192e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };

// ############ USERS ############
export const getUserInfo = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "user_info", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    throw new Error("No se encontraron datos para este usuario.");
  } catch (error: any) {
    throw new Error(errorMessages[error.code] || `${error.message || error}`);
  }
};
export async function postUserInfo(data: TypeUserInfo) {
  try {
    if (!data || !data.id_user) {
      throw new Error("El objeto de datos es inválido o falta el UID.");
    }
    await setDoc(doc(db, "user_info", data.id_user), data);
  } catch (error: any) {
    throw new Error(errorMessages[error.code] || `${error.message || error}`);
  }
}

export const putUserInfo = async (data: TypeUserInfo) => {
  try {
    if (!data.id_user) {
      throw new Error(
        "El UID es necesario para actualizar la información del usuario."
      );
    }

    const userRef = doc(db, "user_info", data.id_user);

    await updateDoc(userRef, {
      phone: data.phone,
      updated_at: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(errorMessages[error.code] || `${error.message || error}`);
  }
};
// ############ REPORTS ############
export const uploadImageToFirebase = async (
  image: { uri: string } | string,
  user_id?: string
) => {
  try {
    const imageUri = typeof image === "string" ? image : image.uri;

    if (!imageUri) throw new Error("NO_IMAGE");

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const storage = getStorage();
    const fileName = `${Date.now()}.jpg`; // Solo el nombre del archivo
    const storageRef = ref(storage, `images/${user_id}/${fileName}`);

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error: any) {
    throw new Error(
      UploadImageErrors[error.message as keyof typeof UploadImageErrors] ||
        UploadImageErrors.UNKNOWN
    );
  }
};
export const listenToReports = (
  city: string,
  onSuccess: (data: any[]) => void,
  onError: (error: unknown) => void
) => {
  try {
    const q = query(
      collection(db, "reports"),
      where("city", "==", city),
      where("status", "!=", "finalizado")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        onSuccess(data);
      },
      (error) => {
        console.error("Error escuchando reports en tiempo real:", error);
        onError(error);
      }
    );

    return unsubscribe; // Para cancelar el listener cuando ya no lo necesites
  } catch (error) {
    console.error("Error al inicializar listener de reports:", error);
    onError(error);
    return () => {}; // función vacía como fallback
  }
};
export const getReportsByUserId = async (id_user: string) => {
  try {
    const q = query(
      collection(db, "reports"),
      where("id_user", "==", id_user),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);
    const reports: any[] = [];
    querySnapshot.forEach((doc: any) => {
      reports.push({ id: doc.id, ...doc.data() });
    });
    return reports;
  } catch (error: any) {
    throw new Error(errorMessages[error.code] || `${error.message || error}`);
  }
};
export const postReport = async (report: TypeDataPostBeforePost) => {
  try {
    const auth = getAuth();

    const typeReportData = {
      title: report.title,
      content: report.content,
      category: report.category,
      image_url: report.image_url,
      coords: report.coords,
      location: new GeoPoint(report.coords.latitude, report.coords.longitude),
      geohash: geohashForLocation([
        report.coords.latitude,
        report.coords.longitude,
      ]),
      created_at: serverTimestamp(),
      phone: report.phone,
      id_user: auth.currentUser ? auth.currentUser.uid : report.id_user,
      state: report.state,
      city: report.city,
      status: "pendiente",
    };

    // Subir los datos a la colección 'reports' en Firestore
    await addDoc(collection(db, "reports"), typeReportData);

    // Mostrar en consola los datos del reporte
    // console.log("Report Submitted:", {
    //   ...typeReportData,
    //   docId: docRef.id, // ID del documento creado
    // });
  } catch (error: any) {
    throw new Error(errorMessages[error.code] || `${error.message || error}`);
  }
};

export const putReportById = async (report: TypeDataPost) => {
  try {
    if (!report.id_user) {
      throw new Error("El UID es necesario para actualizar el commentario.");
    }

    const reports = doc(db, "reports", report.id);

    await updateDoc(reports, {
      title: report.title,
      content: report.content,
      category: report.category,
      updated_at: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(errorMessages[error.code] || `${error.message || error}`);
  }
};
export const deleteReportById = async (id_report: string) => {
  try {
    await deleteDoc(doc(db, "reports", id_report));
  } catch (error: any) {
    throw new Error(errorMessages[error.code] || `${error.message || error}`); // Error en la eliminación
  }
};
