"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { decodeJwt } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export default function Home() {
  const [logged, setLogged] = useState<boolean>(false);
  const { token, setToken } = useAuth();

  const router = useRouter();

  useEffect(() => {
    console.log(token);
    if (token.length > 0) {
      setLogged(true);
      router.push("/createuser");
    }

    if (typeof token !== "string") {
      if ("data" in token) {
        setLogged(true);
        router.push("/home");
      }
    }
  }, [token]);

  return (
    <main className="container mx-auto min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full flex justify-center p-2">
        {!logged ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("credResponse:", credentialResponse);
              const { credential } = credentialResponse;
              const payload = credential ? decodeJwt(credential) : undefined;
              if (payload) {
                console.log("payload:", payload);
                typeof credential === "string" &&
                  axios
                    .post(
                      "http://127.0.0.1:5001/t-house-10/us-central1/api/user/googleLogin",
                      {
                        email: payload.email,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${credential}`,
                        },
                      }
                    )
                    .then((response) => setToken(response.data))
                    .catch((error) => console.log("el error es:", error));
              }
            }}
            onError={(error: void) => console.log("OnERROR ACA:", error)}
            useOneTap
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
