/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TypeCoord,
  TypeCategory,
  TypeDataPostBeforePost,
} from "../models/globalInfo.types";
import TextInputComponent from "./TextInputComponent";
import TextareaComponent from "./TextareaComponent";

const initialData: TypeDataPostBeforePost = {
  title: "",
  content: "",
  category: "",
  image_url: "",
  coords: { latitude: 0, longitude: 0 },
  phone: "",
  id_user: "",
  city: "",
  state: "",
  status: "pendiente",
};

interface ReportComponentProps {
  categories: TypeCategory[];
  selectedPoint: TypeCoord | null;
}

export default function ReportComponent({
  selectedPoint,
  categories,
}: ReportComponentProps) {
  const [formData, setFormData] = useState<TypeDataPostBeforePost>(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    console.log("Archivo de imagen:", imageFile);
    // Lógica de envío
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "90%",
        margin: "auto",
        // padding: "1rem",
      }}
    >
      <div
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file && file.type.startsWith("image/")) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        style={{
          //   border: "2px dashed gray",
          width: "100%",
          marginTop: "1rem",
          padding: "1rem",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#f9f9f9",
          minHeight: "220px", // Tamaño fijo
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imagePreview ? (
          <div style={{ width: "100%", height: "200px" }}>
            <img
              src={imagePreview}
              alt="Vista previa"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ) : (
          <div>
            <p style={{ color: "#666" }}>
              Arrastra y suelta una imagen aquí o haz clic para seleccionarla
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="upload-image-input"
            />
            <label htmlFor="upload-image-input">
              <div
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.5rem 1rem",
                  border: "1px solid gray",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Seleccionar imagen
              </div>
            </label>
          </div>
        )}
      </div>

      {selectedPoint ? (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <p>{selectedPoint.latitude}</p>
          <p>{selectedPoint.longitude}</p>
        </div>
      ) : (
        <p>Seleccione un lugar en el mapa</p>
      )}

      <TextInputComponent
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: ".5rem .1rem",
          height: "2.5rem",
          backgroundColor: "#EDEDED",
          border: "1px solid transparent",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          outline: "none",
          transition: "border 0.2s ease-in-out",
        }}
        onFocus={(e) => (e.currentTarget.style.border = "1px solid #8B5CF6")}
        onBlur={(e) => (e.currentTarget.style.border = "1px solid transparent")}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.currentTarget) {
            e.currentTarget.style.border = "1px solid #8B5CF6";
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.currentTarget) {
            e.currentTarget.style.border = "1px solid transparent";
          }
        }}
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        {categories.map((option: TypeCategory) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <TextareaComponent
        name="content"
        placeholder="Contenido"
        value={formData.content}
        onChange={handleChange}
        rows={4}
        required
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "0.75rem",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Enviar reporte
      </button>
    </form>
  );
}
