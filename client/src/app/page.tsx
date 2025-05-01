"use client";
import Heading from "@/utils/Heading";
import { FC, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Route/Hero";
import CustomModal from "@/utils/CustomModal";
import Login from "../components/auth/Login";
import SignUp from "@/components/auth/SignUp";
interface Props {}
const Page: FC<Props> = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("home");
  return (
    <div className="">
      <Heading
        title="E learning "
        description="Lms team from kerala"
        keywords={["lms", "learning site"]}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Hero />
      {route === "login" ? (
        <CustomModal
          open={open}
          setOpen={setOpen}
          title=""
          activeItem={activeItem}
          component={<Login setRoute={setRoute} />}
          setRoute={setRoute}
        />
      ) : (
        <CustomModal
          open={open}
          setOpen={setOpen}
          title="SignUp"
          activeItem={activeItem}
          component={<SignUp setRoute={setRoute} />}
          // component={<div>SignUp</div>}
          setRoute={setRoute}
        />
      )}
    </div>
  );
};
export default Page;
