// Danh sách ban đầu rỗng
let array = [];

// Hàm thêm phần tử vào danh sách
const addElement = (i, x) => {
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
const findMin = (i, j) => {
  // Tìm phần tử nhỏ nhất trong đoạn từ i đến j
  return Math.min(...array.slice(i - 1, j));
};

const handleRequest = (t, x, y) => {
  switch (t) {
    // + i x – bổ sung số nguyên x vào vị trí sau phần tử thứ i của danh sách các số nguyên hiện có,
    // nếu i = 0 thì có nghĩa là bổ sung vào đầu danh sách,
    case "+":
      addElement(x, y);
      console.log(array, "array");
      return;
    // ? i j – đưa ra phần tử nhỏ nhất trong đoạn từ phần tử thứ i đến hết phần tử thứ j trong danh sách.
    case "?":
      return findMin(x, y);
    default:
      break;
  }
};

// Các yêu cầu
const requests = [
  ["+", 0, 5],
  ["+", 1, 3],
  ["+", 1, 4],
  ["?", 1, 2],
  ["+", 0, 2],
  ["?", 2, 4],
  ["+", 4, 1],
  ["?", 3, 5],
];

// Xử lý các yêu cầu
requests.forEach((request) => {
  console.log(request, "request");
  const res = handleRequest(request[0], request[1], request[2]);
  console.log(res, "res");
});
