import Image from "next/image";
import Avatar from "@/assets/avatar.webp";
import React from "react";

function ButtonUserProfile() {
  return (
    <div>
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="m-1">
          <div className="avatar">
            <div className="w-[30px] rounded-full overflow-hidden">
              <Image
                src={Avatar}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bgSecondary rounded-box z-[1] w-52 shadow-lg"
        >
          <li className="bg-primary w-full rounded-md">
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ButtonUserProfile;
