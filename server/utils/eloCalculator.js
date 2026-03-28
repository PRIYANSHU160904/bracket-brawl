const calculateElo = (winnerRating, loserRating, kFactor = 32) => {
  
  const expectedWinner =
    1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
  const expectedLoser =
    1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400));

  const newWinnerRating = Math.round(
    winnerRating + kFactor * (1 - expectedWinner),
  );
  const newLoserRating = Math.round(
    loserRating + kFactor * (0 - expectedLoser),
  );

  return {
    newWinnerRating,
    newLoserRating,
    winnerRatingChange: newWinnerRating - winnerRating,
    loserRatingChange: newLoserRating - loserRating,
  };
};

module.exports = calculateElo;
