# เอกสารทางเทคนิค - แอปพลิเคชันร้านอาหารอิตาลี

## โครงสร้างโปรเจค
```
src/
├── assets/
│   └── images/          # รูปภาพสำหรับรายการอาหาร
├── components/
│   ├── cart/           # คอมโพเนนต์ที่เกี่ยวข้องกับตะกร้า
│   ├── common/         # คอมโพเนนต์ที่ใช้ร่วมกัน
│   ├── home/           # คอมโพเนนต์หน้าแรก
│   ├── layouts/        # คอมโพเนนต์โครงสร้าง
│   └── store/          # การจัดการสถานะ
├── pages/              # คอมโพเนนต์หน้า
└── routes/             # การกำหนดเส้นทาง
```

## สถาปัตยกรรมคอมโพเนนต์

### 1. การจัดการสถานะ (useStore.tsx)
```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface StoreState {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: number) => void;
  increaseQuantity: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
}
```

### 2. คอมโพเนนต์หลัก

#### Category.tsx
- จัดการการแสดงเมนูและการสลับหมวดหมู่
- จัดการการเลือกรายการและการเพิ่มลงตะกร้า
- Props: ไม่มี
- State:
  - isPasta: boolean
  - showPopup: boolean
  - popupMessage: string

#### Order.tsx
- จัดการฟังก์ชันการทำงานของตะกร้า
- จัดการการปรับจำนวนรายการ
- คำนวณยอดรวมรวมภาษีมูลค่าเพิ่ม
- Props: ไม่มี
- State:
  - showReceipt: boolean

#### Navbar.tsx
- ให้การนำทางและการเข้าถึงตะกร้า
- แสดงจำนวนรายการในตะกร้า
- Props: ไม่มี
- State: ไม่มี

## การไหลของข้อมูล
1. การกระทำของผู้ใช้จะกระตุ้นการอัปเดตสถานะผ่าน useStore
2. การเปลี่ยนแปลงสถานะจะส่งต่อไปยังคอมโพเนนต์ที่เกี่ยวข้อง
3. UI จะอัปเดตตามสถานะปัจจุบัน

## ระบบการออกแบบ
- ใช้ Tailwind CSS สำหรับการออกแบบ
- ใช้สีตามธงชาติอิตาลี
- ออกแบบให้รองรับการแสดงผลบนอุปกรณ์ต่างๆ โดยใช้ breakpoints ของ Tailwind

## การใช้งานฟีเจอร์หลัก

### 1. การจัดการตะกร้า
```typescript
// การเพิ่มรายการลงตะกร้า
addToCart: (item) =>
  set((state) => {
    const existingItem = state.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    } else {
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      };
    }
  }),
```

### 2. การคำนวณคำสั่งซื้อ
```typescript
const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
const vat = subtotal * 0.07;
const total = subtotal + vat;
```

## การเชื่อมต่อ API
ปัจจุบันแอปพลิเคชันใช้ข้อมูลแบบคงที่ สำหรับการพัฒนาต่อไป:
1. สร้าง API endpoints สำหรับ:
   - รายการอาหาร
   - การประมวลผลคำสั่งซื้อ
   - การยืนยันตัวตนผู้ใช้
2. เพิ่มการจัดการข้อผิดพลาด
3. เพิ่มสถานะการโหลด

## การพิจารณาด้านประสิทธิภาพ
1. การปรับแต่งรูปภาพ
2. การโหลดคอมโพเนนต์แบบ lazy
3. การปรับแต่งการจัดการสถานะ
4. การแยกโค้ด

## กลยุทธ์การทดสอบ
1. การทดสอบหน่วยสำหรับ:
   - การจัดการสถานะ
   - การแสดงผลคอมโพเนนต์
   - การโต้ตอบกับผู้ใช้
2. การทดสอบการรวมสำหรับ:
   - ฟังก์ชันการทำงานของตะกร้า
   - การประมวลผลคำสั่งซื้อ
3. การทดสอบแบบ end-to-end สำหรับ:
   - กระบวนการใช้งานทั้งหมด
   - กระบวนการชำระเงิน

## การติดตั้ง
1. กระบวนการ build:
```bash
npm run build
```
2. ข้อกำหนดการติดตั้ง:
   - สภาพแวดล้อม Node.js
   - การโฮสต์ไฟล์แบบ static
   - ใบรับรอง SSL สำหรับการเชื่อมต่อที่ปลอดภัย

## การพัฒนาต่อไป
1. การยืนยันตัวตนผู้ใช้
2. ประวัติการสั่งซื้อ
3. การรวมระบบการชำระเงิน
4. แดชบอร์ดสำหรับผู้ดูแลระบบ
5. การอัปเดตคำสั่งซื้อแบบ real-time

## การพิจารณาด้านความปลอดภัย
1. การตรวจสอบข้อมูลนำเข้า
2. การป้องกัน XSS
3. การป้องกัน CSRF
4. การจัดการสถานะที่ปลอดภัย
5. การเข้ารหัสข้อมูล

## การรองรับเบราว์เซอร์
- Chrome (เวอร์ชันล่าสุด)
- Firefox (เวอร์ชันล่าสุด)
- Safari (เวอร์ชันล่าสุด)
- Edge (เวอร์ชันล่าสุด)
- เบราว์เซอร์มือถือ (iOS, Android) 