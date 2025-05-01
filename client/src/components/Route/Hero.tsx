// import Image from "next/image";
// import Link from "next/link";
// import { BiSearch } from "react-icons/bi";
// // type Props = {};
// const Hero = () => {
//   return (
//     <div className="w-full  md:flex items-center">
//       <div className=" top-[100px] lg:top-[unset] 2xl:h-[700px] 2xl:w-[700px]  lg:h-[600px] xl:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] border-2 xl:left-8 2xl:left-14">
//         <div className="lg:w-[40%] flex md: min-h-screen items-center justify-end pt-[70px] md:pt-[0] Z-10">
//           <Image
//             src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
//             alt=""
//             width={100}
//             height={100}
//             className="object-contain 1100px: max-w-[90%] w-[90%] lg:max-w-[85%] h-[auto] z-[10]"
//           />
//         </div>
//       </div>
//       <div className="md: w-[60%] flex flex-col items-center md:mt-[0px] text-center lg:text-left mt-[150px]">
//         <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full lg:text-[70px] font-[600] font-Josefin py-2 md: leading-[75px] lg: w-[6">
//           Improve Your Online Learning Experience Better Instantly
//         </h2>
//         <br />
//         <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] xl:!w-[55%] lgx!w-[78%]">
//           We have 40k+ Online courses & 500K+ Online registered student. Find
//           your desired Courses from them.
//         </p>
//         <br />
//         <br />
//         <div className="lg:w-[55%] 1100px:w-[78% ] w-[90% ] h-[50px] bg-transparent relative">
//           <input
//             type="search"
//             placeholder="Search Courses..."
//             className="bg-transparent border dark: border-none dark: bg-[# 575757] ■dark: placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
//           />
//           <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[# 39c1f3] rounded-r-[5px]">
//             <BiSearch className="text-white" size={30} />
//           </div>
//         </div>
//         <br />
//         <br />
//         <div className="lg:w-[55% ] 1100px: w-[78% ] w-[90%] flex items-center">
//           <Image
//             src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
//             alt=""
//             width={100}
//             height={100}
//             className="rounded-full"
//           />
//           <Image
//             src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
//             alt=""
//             width={100}
//             height={100}
//             className="rounded-full ml-[-20px]"
//           />
//           <Image
//             src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
//             alt=""
//             width={100}
//             height={100}
//             className="rounded-full ml-[-20px]"
//           />
//           <p className="font-Josef in dark:text-[#edfff4] text-[#000000b3] md: pl-3 text-[18px] font-[600]">
//             500K+ People already trusted us.
//             <Link
//               href="/courses"
//               className="dark:text-[#46e256] text-[crimson]"
//             >
//               View Courses
//             </Link>
//           </p>
//         </div>
//         <br />
//       </div>
//     </div>
//   );
// };
// export default Hero;
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full md:flex items-center relative">
      {/* Background Circle Animation */}
      <div className="absolute top-[100px] md:top-[unset] lg:h-[700px] lg:w-[700px] md:h-[600px] md:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] lg:left-8 lg:left-14" />

      {/* Left Side - Image */}
      <div className="md:w-[40%] flex md:min-h-screen items-center justify-end pt-[70px] md:pt-0 z-10">
        <Image
          alt="Hero"
          loading="lazy"
          width={400}
          height={400}
          decoding="async"
          className="object-contain md:max-w-[90%] w-[90%] lg:max-w-[85%] h-auto z-10"
          src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
          style={{ color: "transparent" }}
        />
      </div>

      {/* Right Side - Content */}
      <div className="md:w-[60%] flex flex-col items-center lg:mt-0 text-center md:text-left mt-[150px]">
        {/* Heading */}
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full md:text-[70px] font-[600] font-Josefin py-2 md:leading-[75px] lg:w-[60%] 1100px:w-[78%]">
          {/* Add your heading text here */}
          Empower Your Learning Journey
        </h2>

        <br />

        {/* Subheading */}
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] lg:w-[55%] 1100px:w-[78%]">
          Learn from the best courses and boost your skills to new heights.
        </p>

        <br />
        <br />

        {/* Search Input */}
        <div className="lg:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] cursor-pointer">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-white"
              height="30"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
            </svg>
          </div>
        </div>

        <br />
        <br />

        {/* Clients Section */}
        <div className="lg:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          {/* Clients Avatars */}
          <Image
            src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
            alt="Client 1"
            width={46}
            height={46}
            className="rounded-full"
            loading="lazy"
            decoding="async"
            style={{ color: "transparent" }}
          />
          <Image
            src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
            alt="Client 2"
            width={46}
            height={46}
            className="rounded-full ml-[-20px]"
            loading="lazy"
            decoding="async"
            style={{ color: "transparent" }}
          />
          <Image
            src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
            alt="Client 3"
            width={46}
            height={46}
            className="rounded-full ml-[-20px]"
            loading="lazy"
            decoding="async"
            style={{ color: "transparent" }}
          />

          {/* Client Text */}
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] md:pl-3 text-[18px] font-[600]">
            500K+ People already trusted us.{" "}
            <a className="dark:text-[#46e256] text-[crimson]" href="/courses">
              View Courses
            </a>
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Hero;
