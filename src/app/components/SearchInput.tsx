// components/SearchInput.tsx
"use client";

import React from "react";
import { Input, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  width?: string | number;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar...",
  width = "250px",
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          paddingLeft: "0.5rem",
          height: "32px",
          fontSize: "14px",
          width,
        }}
        disableUnderline
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        }
      />
      <IconButton onClick={onSearch} size="small">
        <SearchIcon htmlColor="white" />
      </IconButton>
    </div>
  );
};

export default SearchInput;
