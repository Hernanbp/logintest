"use client";
import Image from "next/image";
import { useState } from "react";

const CreateProperty = () => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    const previews: any = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target?.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <form className="flex flex-col w-full max-w-sm gap-4 p-4 rounded-md ring-1 ring-[#2f2f2f] shadow-lg bg-[#161616]">
        <div className="flex flex-col space-y-1.5 text-sm bg-transparent">
          <label className="bg-transparent" htmlFor="name">
            Name
          </label>
          <input
            className="bg-[#1c1c1c] p-2 rounded-md"
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5 text-sm bg-transparent">
          <label className="bg-transparent" htmlFor="email">
            Email
          </label>
          <input
            className="bg-[#1c1c1c] p-2 rounded-md"
            id="email"
            placeholder="Enter your email"
            required
            type="email"
          />
        </div>
        <div className="flex flex-col space-y-1.5 text-sm bg-transparent">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-transparent"
            htmlFor="file"
          >
            Imagenes
          </label>
          <label
            htmlFor="file"
            className="flex items-center justify-between cursor-pointer border border-[#3e3e3e] px-3 py-2 bg-[#313131] rounded-md text-sm shadow-sm hover:bg-[#393939] transition ease-linear relative"
          >
            <span className="bg-transparent">Subir Imagenes</span>
            <span className="text-xs bg-transparent text-[#9c9c9c]">
              {imagePreviews.length}{" "}
              {imagePreviews.length === 1 ? "imagen" : "imagenes"}
            </span>
            <input
              className="hidden"
              accept="image/*"
              id="file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="flex space-x-2 mt-2 bg-transparent">
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              className="relative w-24 h-24 rounded-md ring-1 ring-[#545454] border-2 border-[#1c1c1c] overflow-hidden shadow-sm"
            >
              <Image
                src={preview}
                alt={`Preview ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        <button
          className="bg-orange-600 rounded-md font-semibold text-sm py-2"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CreateProperty;
