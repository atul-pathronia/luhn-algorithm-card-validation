const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

exports.cardVerificaiton = catchAsync(async (req, res, next) => {
  const { cardNumber, cardCVV, cardMM, cardYY } = req.body;
  const currentYear = new Date(Date.now()).getFullYear();
  const currentMonth = new Date(Date.now()).getMonth() + 1;

  // All fields empty throw error
  if (!cardNumber || !cardCVV || !cardMM || !cardYY) {
    return next(new AppError("All Details required", 400));
  }

  // CVV length check
  if (!(cardCVV.length === 3)) {
    return next(new AppError(`CVV needs to be 3 digit`, 400));
  }

  // card Month length check
  if (!(cardMM.length === 2)) {
    return next(new AppError(`Month needs to be 2 digit`, 400));
  }

  // card Year length check
  if (!(cardYY.length === 4)) {
    return next(new AppError(`Year needs to be 4 digit`, 400));
  }

  // card month limit control
  if (cardMM * 1 < 1 || cardMM * 1 > 12) {
    return next(new AppError(`Incorrect card month`, 400));
  }

  // card backdated month check
  if (cardYY * 1 === currentYear) {
    if (cardMM * 1 < currentMonth)
      return next(new AppError(`Card Expired`, 400));
  }

  // card backdated year check
  if (cardYY * 1 < currentYear) {
    return next(new AppError(`Card Expired`, 400));
  }

  // return card numbers as array where typeof is number
  let arrOfCardNumber = cardNumber.split("").map((str) => Number(str));

  // for loop to transform the even place numbers and return the array
  for (let index = arrOfCardNumber.length - 2; index >= 0; index = index - 2) {
    arrOfCardNumber[index] = arrOfCardNumber[index] * 2;

    if (arrOfCardNumber[index] > 9) {
      arrOfCardNumber[index] = (arrOfCardNumber[index] % 10) + 1;
    }
  }

  // Total of all elements of an array
  let total = 0;
  for (let index = 0; index < arrOfCardNumber.length; index++) {
    total += arrOfCardNumber[index];
  }

  // Check luhn algo principle
  if (total % 10 === 0) {
    res.status(200).json({
      status: "success",
      message: "Card validation successful",
    });
  } else {
    res.status(400).json({
      status: "failed",
      message: "Card validation unsuccessful",
    });
  }
});
