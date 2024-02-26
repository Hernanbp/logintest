import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center ">
        <h1 className="font-bold text-5xl">HOME</h1>
        <Link
          href="/createproperty"
          className="bg-white text-black text-sm font-semibold p-2 rounded-lg shadow-sm hover:shadow transition"
        >
          Crear Propiedad
        </Link>
      </div>
    </div>
  );
};

export default Home;
