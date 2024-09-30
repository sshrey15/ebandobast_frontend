import React from "react";
import Image from "next/image";

const Navbar = ({ name }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 shadow-lg">
      {/* Profile Image */}
      <div className="flex items-center">
        <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/014/935/766/non_2x/indian-policeman-icon-flat-isolated-vector.jpg"
            alt="Officer"
            className="rounded-full"
            width={50}
            height={50}
          />
        </div>
        <div className="ml-4 text-white">
          <p className="text-sm md:text-md font-bold">Hello,</p>
          <p className="text-lg md:text-xl font-bold">Shrey Kumar Singh</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;