import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoToPage({ path }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("object")
    navigate(path);
  }, [navigate, path]);

  return null; // Since the navigation happens in useEffect, return null or something else if needed
}

export default GoToPage;
