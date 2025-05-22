"use client";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import img1 from "../../../../public/assests/banner-img-1.png";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
              // src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
              src={data?.layout?.banner?.image?.url || img1}
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
              />
              <div
                className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                onClick={handleSearch}
              >
                <BiSearch className="text-white" size={30} />
              </div>
            </div>

            <br />
            <br />

            {/* Clients Section */}
            <div className="lg:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
              {/* Clients Avatars */}
              <Image
                // src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
                src="/assests/client-1.jpg"
                alt="Client 1"
                width={46}
                height={46}
                className="rounded-full"
                loading="lazy"
                decoding="async"
                style={{ color: "transparent" }}
              />
              <Image
                // src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
                src="/assests/client-2.jpg"
                alt="Client 2"
                width={46}
                height={46}
                className="rounded-full ml-[-20px]"
                loading="lazy"
                decoding="async"
                style={{ color: "transparent" }}
              />
              <Image
                src="/assests/client-3.jpg"
                // src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
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
                <Link
                  className="dark:text-[#46e256] text-[crimson]"
                  href="/courses"
                >
                  View Courses
                </Link>
              </p>
            </div>
            <br />
          </div>

          {/* <div className="w-full 1000px:flex items-center">
            <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div>
            <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
              <Image
                src={data?.layout?.banner?.image?.url || img1}
                width={400}
                height={400}
                alt=""
                className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
              />
            </div>
            <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
              <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
                {data?.layout?.banner?.title}
              </h2>
              <br />
              <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
                {data?.layout?.banner?.subTitle}
              </p>
              <br />
              <br />
              <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
                <input
                  type="search"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                />
                <div
                  className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                  onClick={handleSearch}
                >
                  <BiSearch className="text-white" size={30} />
                </div>
              </div>
              <br />
              <br />
              <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
                <Image
                  src="/assests/client-1.jpg"
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <Image
                  src="/assests/client-2.jpg"
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full ml-[-20px]"
                />
                <Image
                  src="/assests/client-3.jpg"
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full ml-[-20px]"
                />
                <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                  500K+ People already trusted us.{" "}
                  <Link
                    href="/courses"
                    className="dark:text-[#46e256] text-[crimson]"
                  >
                    View Courses
                  </Link>{" "}
                </p>
              </div>
              <br />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Hero;
