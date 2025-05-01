import Link from "next/link";
import { useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "@/utils/CustomModal";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

type HeaderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: string;
  route: string;
  setRoute: (route: string) => void;
};
const Header = ({
  open,
  setOpen,
  activeItem,
  route,
  setRoute,
}: HeaderProps) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
    setOpen(!open);
  };
  // const handleCloseSidebar = (e: any) => {
  //   if (e.target.id === "screen") {
  //     setOpenSidebar(false);

  //   }
  // };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, [active]);
  return (
    <div className="w-full relative">
      <div
        //  ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 right-0 z-50 w-full h-[80px] border-b shadow-xl dark:border-[#ffffff1c] backdrop:blur-sm  transition-all duration-500 ease-in-out"
        // className="dark:shadow  z-50 w-full h-[80px] border-b shadow-xl dark:border-[#ffffff1c] "
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed w-full z-99 left-0 border-b shadow-xl dark:border-[#ffffff1c] backdrop:blur-sm  transition-all duration-500 ease-in-out"
            : "dark:shadow  z-50 w-full h-[80px] border-b shadow-xl dark:border-[#ffffff1c] "
        }`}
      >
        <div className="w-[95%] 800px:w-92 m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-poppins font-[500] text-black dark:text-white"
              >
                E learning
              </Link>
            </div>
            <div className="flex  items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              <div className="md:hidden flex items-center justify-center">
                <HiOutlineMenuAlt3
                  size={30}
                  className="text-black dark:text-white cursor-pointer"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="text-black dark:text-white cursor-pointer hidden md:block"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
        </div>
        {/* sadflkasjdfl lasdjfl o iasdjflo dflijdlf */}

        {openSidebar && (
          <div
            className="md:hidden fixed w-full h-screen top-0 left-0 bg-black/50 z-90"
            onClick={handleSidebar}
            id="screen"
          >
            <div className="w-[70%] fixed z-99 h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 ">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="text-black dark:text-white ml-5 cursor-pointer"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright @2024 Elearning
              </p>
            </div>
            {/* <div className="w-full text-center py-6">
            </div> */}
          </div>
        )}
      </div>
      {route === "login " && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              title="Login"
              activeItem={activeItem}
              component={<Login setRoute={setRoute} />}
              // component={<div>Login</div>}
              setRoute={setRoute}
            />
          )}
        </>
      )}
      {route === "signup" && (
        <>
          {open && (
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
        </>
      )}
    </div>
  );
};
export default Header;
