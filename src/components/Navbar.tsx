import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router";
import useStore from "./store/useStore";

const Navbar = () => {
  const { cartItems } = useStore();

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-white md:relative md:bottom-auto md:w-auto">
        <div className="container mx-auto max-w-[320px] md:max-w-[1320px] md:px-10 h-[45px] md:h-[50px] flex justify-between items-center border-t-1 md:border-t-0 md:border-b-1 border-[#CE2B37]">
          <div>
            <Link to="/">
              <h2 className="font-bold text-[17px] md:text-[27px] text-[#CE2B37]">Italian Restaurant</h2>
            </Link>
          </div>
          <form className="relative">
            <Link to="/cart">
              <IoCartOutline size={25} />
            </Link>
            {cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </div>
            )}
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;