import { useLocation } from "react-router-dom";

export function useParseParams(){
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params;
}