import useStore from "../store/useStore";
import { QRCodeSVG } from "qrcode.react";

interface ReceiptProps {
  onClose: () => void;
}

const Receipt = ({ onClose }: ReceiptProps) => {
  const { cartItems } = useStore();
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  const handlePrint = () => {
    window.print();
  };

  // สร้างข้อมูลสำหรับ QR Code
  const receiptData = {
    date: new Date().toLocaleString(),
    items: cartItems.map(item => ({
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price
    })),
    subtotal,
    vat,
    total
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 print:bg-white print:p-0 print:shadow-none">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Italian Restaurant</h2>
          <p className="text-gray-600">ใบเสร็จรับเงิน</p>
        </div>

        <div className="border-b border-gray-300 pb-4 mb-4">
          <p className="text-right text-sm text-gray-600">
            {new Date().toLocaleString()}
          </p>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size || "no-size"}`} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-gray-600">ขนาด: {item.size}</p>
                )}
                <p className="text-sm text-gray-600">x{item.quantity}</p>
              </div>
              <p className="font-medium">{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mt-4 pt-4 space-y-2">
          <div className="flex justify-between">
            <p>ราคารวมย่อย:</p>
            <p>{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>ภาษีมูลค่าเพิ่ม (7%):</p>
            <p>{vat.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <p>ราคารวมทั้งหมด:</p>
            <p>{total.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="mb-4">
            <QRCodeSVG
              value={JSON.stringify(receiptData)}
              size={128}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">สแกน QR Code เพื่อดูรายละเอียดเพิ่มเติม</p>
        </div>

        <div className="mt-8 flex justify-center space-x-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-[#CB8A58] text-white px-6 py-2 rounded-md hover:bg-[#562B1A] transition-colors"
          >
            พิมพ์ใบเสร็จ
          </button>
          <button
            onClick={onClose}
            className="border border-[#CB8A58] text-[#CB8A58] px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 