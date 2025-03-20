import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hàm thêm phần tử vào danh sách
const addElement = (array: number[], i: number, x: number) => {
  if (i === 0) {
    // Thêm phần tử x vào đầu danh sách
    array.unshift(x);
  } else {
    // Thêm vào sau phần tử x vào vị trí thứ i
    // splice(start, deleteCount, item1, item2, /* …, */ itemN)
    array.splice(i, 0, x);
  }
};

// Hàm tìm phần tử nhỏ nhất trong đoạn từ i đến j
const findMin = (array: number[], i: number, j: number) => {
  // Tìm phần tử nhỏ nhất trong đoạn từ i đến j
  return Math.min(...array.slice(i - 1, j));
};

export const handleRequest = (
  array: number[],
  t: string,
  x: number,
  y: number
) => {
  switch (t) {
    // + i x – bổ sung số nguyên x vào vị trí sau phần tử thứ i của danh sách các số nguyên hiện có,
    // nếu i = 0 thì có nghĩa là bổ sung vào đầu danh sách,
    case "+":
      addElement(array, x, y);
      console.log(array, "array");
      return;
    // ? i j – đưa ra phần tử nhỏ nhất trong đoạn từ phần tử thứ i đến hết phần tử thứ j trong danh sách.
    case "?":
      return findMin(array, x, y);
    default:
      break;
  }
};
