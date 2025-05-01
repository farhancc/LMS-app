import Link from "next/link";

interface Props {
  activeItem: string;
  isMobile: boolean;
}
const NavItems = ({ activeItem, isMobile }: Props) => {
  const NavItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Courses",
      link: "/courses",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Policies",
      link: "/policies",
    },
    {
      name: "FAQ",
      link: "/faq",
    },
  ];
  return (
    <>
      <div className="hidden md:flex items-center justify-center">
        {NavItems.map((item, index) => (
          <div
            key={index}
            className={`${
              activeItem === item.name
                ? "text-[crimson] dark:text-[#37a39a] "
                : "text-gray-700 dark:text-gray-300"
            } ${
              isMobile ? "text-[20px]" : "text-[16px]"
            } font-poppins font-[400] cursor-pointer  text-[16px] px-6`}
          >
            <Link href={item.link}>{item.name}</Link>
          </div>
        ))}
      </div>
      {/* {
        isMobile && (
          <div className="md:hidden flex items-center justify-center">
            {NavItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  activeItem === item.name
                    ? "text-[crimson] dark:text-[#37a39a] "
                    : "text-gray-700 dark:text-gray-300"
                } font-poppins font-[400] cursor-pointer  text-[16px] px-6`}
              >
                <Link href={item.link}>{item.name}</Link>
              </div>
            ))}
          </div>
        )
        // <div className="md:hidden flex items-center justify-center">
      } */}
      {isMobile && (
        <div className="md:hidden mt-5 ">
          <div className="w-full text-start gap-5 flex-col flex py-6">
            <Link href={"/"} passHref>
              <span
                className={`${"text-[crimson] dark:text-[#37a39a] "} font-poppins font-[400] cursor-pointer  text-[16px] px-6`}
              >
                E Learning
              </span>
            </Link>
            {NavItems.map((item, index) => (
              <Link href={"/"} passHref key={index}>
                <span
                  className={`${
                    activeItem === item.name
                      ? "text-[crimson] dark:text-[#37a39a] "
                      : "text-gray-700 dark:text-gray-300"
                  } font-poppins font-[400] cursor-pointer  text-[16px] px-6`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default NavItems;
