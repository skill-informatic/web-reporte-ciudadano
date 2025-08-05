// components/SelectComponent.tsx
"use client";

import React from "react";
import { TypesCategory } from "../models/globalInfo.types";

/**
 * Props del componente SelectComponent.
 *
 * @property options - Arreglo de categorías a mostrar como opciones en el select.
 * @property selectedOption - Valor actualmente seleccionado.
 * @property onChange - Función que se ejecuta cuando el usuario cambia la selección.
 */
interface CategorySelectProps {
  options: TypesCategory[];
  selectedOption: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Componente reutilizable que renderiza un <select> con opciones de categorías.
 *
 * Útil para filtros, formularios o listados donde el usuario debe elegir una categoría.
 *
 * @example
 * <SelectComponent
 *   options={optionsReports}
 *   selectedOption={selectedCategory}
 *   onChange={handleCategoryChange}
 * />
 */
const SelectComponent: React.FC<CategorySelectProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <select
      id="options"
      value={selectedOption}
      onChange={onChange}
      style={{
        height: "32px",
        borderRadius: ".5rem",
        paddingLeft: ".5rem",
      }}
    >
      {/* Opción por defecto para mostrar todas las categorías */}
      <option value="">Mostrar Todas las categorías</option>

      {/* Renderizado dinámico de opciones */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
