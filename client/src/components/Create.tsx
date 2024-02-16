import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../public/Constants";
import Spinner from "./Spinner";

const Create = () => {
  const [searchParam] = useSearchParams();
  const [error, setError] = useState(null as unknown);
  const code = searchParam.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API_URL}/room/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => navigate(`/room/${data.id}`));
        } else throw new Error("Not valid token");
      })
      .catch((err: unknown) => {
        console.error(err);
        setError(err);
      });
  }, []);
  if (error) return <p>Error</p>;
  return <Spinner></Spinner>;
};

export default Create;
