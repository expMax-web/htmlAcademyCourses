function countRatio(prices: number[], profit: number) {
  const profitByDays = Array(prices.length).fill(0);

  // Будем хранить отдельно минимальную цену за все прошедшие дни
  let minPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    // Обновляем минимальную цену
    minPrice = Math.min(minPrice, prices[i]);

    // Если продаём, то получаем прибыль, равную разнице текущей и минимальной цен
    const sellProfit = prices[i] - minPrice;

    // Если не продаём, значит остаёмся при максимальной прибыли за предыдущие дни
    const holdProfit = prices[i - 1];

    // А максимальная прибыль получается при принятии лучшего решения
    profitByDays[i] = Math.max(sellProfit, holdProfit);
  }

  const maxProfit = profitByDays[profitByDays.length - 1];
}

countRatio([4, 3, 1, 4, 3, 6], 4);
