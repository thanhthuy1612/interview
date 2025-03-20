self.onmessage = function (e: MessageEvent) {
  const text = e.data;

  // Chỉ cho phép ký tự alphabet, ., , và khoảng trắng
  const validText = /^[a-zA-Z., ]*$/;
  if (!validText.test(text)) {
    postMessage({
      error: "Tệp chỉ cho phép ký tự alphabet, ., , và khoảng trắng.",
    });
    return;
  }

  // Đếm số từ
  //Mảng các từ
  const words = text.trim().toLowerCase().match(/\S+/g) || [];
  //Danh sách các từ không bị lặp
  const uniqueWordsSet = new Set(words);

  const wordCount = uniqueWordsSet.size;
  // Kiểm tra số lượng từ khác nhau
  if (wordCount < 3) {
    postMessage({ error: "Tệp phải có ít nhất 3 từ khác nhau." });
    return;
  }

  const wordFrequency: { [key: string]: number } = {};

  // Đếm tần suất từ
  words.forEach((word: string) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  const sortedWords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([word, count]) => ({ word, count }));

  postMessage({
    text: text,
    uniqueWords: wordCount,
    topWords: sortedWords,
  });
};
