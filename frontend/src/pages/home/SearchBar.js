import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());  
  };

  return (
    <div
      className="row d-flex justify-content-center mt-4"
      style={{ marginBottom: "28px" }}
    >
      <div className="col-10 col-sm-8 col-md-6 col-lg-4">
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
              },
            }}
          />

          <Button
            type="button"
            variant="contained"
            onClick={handleSearch}
            sx={{
              borderRadius: "25px",
              width: "150px",
              backgroundColor: "#6C5CE7",
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
