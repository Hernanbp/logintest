"use client";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const CreateUser = () => {
  const [role, setRole] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleRoleChange = (selectedRole: any) => {
    setRole(selectedRole);
    console.log(selectedRole);
  };

  const { token } = useAuth();

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/t-house-10/us-central1/api/user/createuser",
        { roles: [role] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUserData(response.data);
      setUserCreated(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center space-y-4">
      {!userCreated ? (
        <>
          <h1 className="text-2xl font-bold">Selecciona tu rol</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => handleRoleChange("OWNER")}
              className={`px-4 py-2 rounded-full ${
                role === "OWNER"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              OWNER
            </button>
            <button
              onClick={() => handleRoleChange("USER")}
              className={`px-4 py-2 rounded-full ${
                role === "USER"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              USER
            </button>
          </div>
          <button
            onClick={handleCreateUser}
            disabled={!role}
            className={`px-4 py-2 rounded-full ${
              role
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-800 cursor-not-allowed"
            }`}
          >
            Crear Usuario
          </button>
        </>
      ) : (
        <div className="max-w-md w-full">
          <p className="font-bold my-1">AccessToken: </p>
          <p className="text-balance max-w-md w-full break-all text-sm text-orange-400">
            {userData.accessToken}
          </p>
          <div className="h-px bg-white/10 my-4"></div>
          <div>
            <p className="font-bold mb-1">Datos:</p>
            {[userData.data].map((data) => (
              <div key={data.id} className="text-sm flex flex-col gap-1 mt-2">
                <p>ID: {data.id}</p>
                <p>Email: {data.email}</p>
                <p>Roles: {data.roles}</p>
                <p>Status: {data.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUser;
