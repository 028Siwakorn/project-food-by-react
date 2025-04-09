import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import pasta from "../../assets/images/pasta.png";
import dessert from "../../assets/images/dessert.png";
import carbonara from "../../assets/images/carbonara.jpg";
import fettuccine from "../../assets/images/fettuccine.jpg";
import penne from "../../assets/images/penne.jpg";
import lasagna from "../../assets/images/lasagna.jpg";
import risotto from "../../assets/images/risotto.jpg";
import pizza from "../../assets/images/pizza.jpg";
import pesto from "../../assets/images/pesto.jpg";
import gnocchi from "../../assets/images/gnocchi.jpg";
import ravioli from "../../assets/images/ravioli.jpg";
import tiramisu from "../../assets/images/tiramisu.jpg";
import cannoli from "../../assets/images/cannoli.jpg";
import pannaCotta from "../../assets/images/panna-cotta.jpg";
import gelato from "../../assets/images/gelato.jpg";
import zeppole from "../../assets/images/zeppole.jpg";

import useStore from "../store/useStore";
import Popup from "../common/Popup";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

const pastaList: Item[] = [
  { id: 101, name: "Spaghetti Carbonara", price: 220, image: carbonara },
  { id: 102, name: "Fettuccine Alfredo", price: 230, image: fettuccine },
  { id: 103, name: "Penne Arrabiata", price: 210, image: penne },
  { id: 104, name: "Lasagna", price: 260, image: lasagna },
  { id: 105, name: "Risotto", price: 240, image: risotto },
  { id: 106, name: "Pizza Margherita", price: 290, image: pizza },
  { id: 107, name: "Pasta Pesto", price: 230, image: pesto },
  { id: 108, name: "Gnocchi", price: 250, image: gnocchi },
  { id: 109, name: "Ravioli", price: 240, image: ravioli },
];

const dessertList: Item[] = [
  { id: 201, name: "Tiramisu", price: 150, image: tiramisu },
  { id: 202, name: "Cannoli", price: 120, image: cannoli },
  { id: 203, name: "Panna Cotta", price: 130, image: pannaCotta },
  { id: 204, name: "Gelato", price: 100, image: gelato },
  { id: 205, name: "Zeppole", price: 90, image: zeppole },
];

const Category: React.FC = () => {
  const [isPasta, setIsPasta] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { addToCart } = useStore()

  const handleAddToCart = (item: Item) => {
    const selectedItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    };

    console.log("Added to cart:", selectedItem);
    addToCart(selectedItem);
  };

  return (
    <>
      <div className="container mx-auto max-w-[320px] md:max-w-[900px] flex flex-col items-start justify-center">
        <h1 className="text-black text-[25px] font-bold mb-5">Category</h1>
        <ul className="flex gap-5">
          <li className={`cursor-pointer rounded-3xl w-[120px] h-[40px] flex justify-center items-center ${isPasta ? 'bg-gradient-to-r from-[#009246] to-[#CE2B37] text-white' : 'bg-white border border-[#CE2B37] text-[#CE2B37]'}`} onClick={() => setIsPasta(true)}>
            <img src={pasta} alt="" className="mr-2 w-[20px]" /> Pasta
          </li>
          <li className={`cursor-pointer rounded-3xl w-[120px] h-[40px] flex justify-center items-center ${!isPasta ? 'bg-gradient-to-r from-[#009246] to-[#CE2B37] text-white' : 'bg-white border border-[#CE2B37] text-[#CE2B37]'}`} onClick={() => setIsPasta(false)}>
            <img src={dessert} alt="" className="mr-2 w-[30px]" /> Dessert
          </li>
        </ul>
      </div>
      <div className="container mt-5 mx-auto max-w-[320px] md:max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-5">
        {(isPasta ? pastaList : dessertList).map((item) => (
          <div key={item.id} className="border-[#CB8A58] border-2 rounded-[25px] p-5 flex flex-col items-center">
            <div className="h-[200px] rounded-[25px] bg-cover bg-center w-full" style={{ backgroundImage: `url(${item.image})` }}></div>
            <h4 className="font-semibold tracking-wider mt-3">{item.name}</h4>
            <div className="flex justify-between items-center w-full mt-2">
              <div>{item.price} Baht</div>
              <IoIosAddCircle onClick={() => handleAddToCart(item)} size={35} className="text-[#CE2B37] cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default Category;
