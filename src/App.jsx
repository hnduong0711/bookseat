// import { seats } from "./constant";

import { useEffect, useState } from "react";
// import { seats } from "./constant";

function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  // Tạo mảng các ghế với trạng thái
  const [seats, setSeats] = useState([]);

  // Khi số dòng/cột thay đổi, cập nhật mảng `seats`
  useEffect(() => {
    const totalSeats = rows * cols;
    const newSeats = Array.from({ length: totalSeats }, (_, index) => ({
      id: index + 1,
      row: Math.floor(index / cols),
      col: index % cols,
      type: null, // Loại ghế: single, couple, hoặc null
      name: "", // Tên ghế
    }));
    setSeats(newSeats);
  }, [rows, cols]);

  const [isCouple, setIsCouple] = useState(false);

  const handleType = (status) => {
    setIsCouple(status);
  };

  // Hàm xử lý khi chọn ghế
  const handleSelectSeat = (seatId) => {
    setSeats((prevSeats) => {
      const selectedSeat = prevSeats.find((seat) => seat.id === seatId);

      // Nếu ghế không hợp lệ (ví dụ: đã chọn hoặc là "none"), không làm gì cả
      if (!selectedSeat || selectedSeat.type) return prevSeats;

      // Nếu chọn ghế đôi, kiểm tra ghế kế tiếp
      if (isCouple) {
        const nextCol = selectedSeat.col + 1;

        // Kiểm tra ghế kế bên có hợp lệ không (không vượt quá cột và chưa bị chọn)
        if (nextCol < cols) {
          const nextSeat = prevSeats.find(
            (seat) => seat.row === selectedSeat.row && seat.col === nextCol
          );

          if (nextSeat && !nextSeat.type) {
            return prevSeats.map((seat) => {
              if (seat.id === seatId) {
                return {
                  ...seat,
                  type: "couple",
                  name: `C-${seatId}`,
                };
              }
              if (seat.id === nextSeat.id) {
                return {
                  ...seat,
                  type: "none", // Vô hiệu hóa ghế kế bên
                  name: "",
                };
              }
              return seat;
            });
          }
        }
      }

      // Nếu là ghế đơn
      return prevSeats.map((seat) =>
        seat.id === seatId
          ? { ...seat, type: "single", name: `S-${seatId}` }
          : seat
      );
    });
  };

  return (
    <div className="p-2 text-center flex">
      {/* Grid chứa ghế */}
      <div className="w-full basis-[90%]">
        <div
          className={`grid gap-x-1 gap-y-2`}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`${
                seat.type === "couple"
                  ? "col-span-2"
                  : seat.type === "none"
                  ? "hidden"
                  : "col-span-1"
              } ${
                seat.type ? "bg-green-400" : "bg-gray-400"
              } rounded-md flex justify-center items-center cursor-pointer`}
              onClick={() => handleSelectSeat(seat.id)}
            >
              {seat.name || `Seat ${seat.row}-${seat.col}`}
            </div>
          ))}
        </div>
      </div>

      {/* Chọn loại ghế */}
      <div className="pt-10 flex justify-between basis-[10%]">
        <div className="">
          <div className="text-2xl text-center">Chọn loại ghế</div>
          <div className="flex justify-evenly">
            <div
              className={`${
                isCouple ? "bg-red-200" : "bg-red-400"
              } w-[50px] rounded-md cursor-pointer `}
              onClick={() => handleType(false)}
            >
              Đơn
            </div>
            <div
              className={`${
                isCouple ? "bg-red-400" : "bg-red-200"
              } w-[100px] rounded-md cursor-pointer `}
              onClick={() => handleType(true)}
            >
              Đôi
            </div>
          </div>
          {/* Chỉnh sửa số dòng và cột */}
          <div className="flex flex-col">
            <div className="">Chỉnh sửa phòng</div>
            {/* Dòng */}
            <div className="mt-4">
              <span>Số dòng: </span>
              <button
                onClick={() => {
                  setRows((prev) => Math.max(prev - 1, 0));
                }}
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={rows}
                className="border-black rounded-sm w-[100px] text-center"
                onChange={(e) => setRows(Number(e.target.value))}
              />
              <button onClick={() => setRows((prev) => prev + 1)}>+</button>
            </div>
            {/* Cột */}
            <div className="mt-4">
              <span>Số cột: </span>
              <button
                onClick={() => {
                  setCols((prev) => Math.max(prev - 1, 0));
                }}
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={cols}
                className="border-black rounded-sm w-[100px] text-center"
                onChange={(e) => setCols(Number(e.target.value))}
              />
              <button onClick={() => setCols((prev) => prev + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// {
//   <div
//   className={`${
//     seat.type === "couple" ? "col-span-2" : "col-span-1"
//   } ${
//     seat.name === "" ? "bg-transparent" : ""
//   } bg-red-400 rounded-md `}
//   key={index}
//   onClick={handleArrange}
// >
//   {seat.name}
// </div>
// }
