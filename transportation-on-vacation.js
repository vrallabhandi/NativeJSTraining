function rentalCarCost(d) {
  var perDayCost = 40,
      totalCost = d * perDayCost,
      discount;
  
  if (d < 3) {
    discount = 0;
  } else if (d >=3 && d <7) {
    discount = 20;
  } else {
    // 7 or more than 7 days
    discount = 50;
  }
  
  return totalCost - discount;
}