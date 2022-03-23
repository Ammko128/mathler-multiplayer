const originalGuess = ['1', '3', '3'];
const guess = [...originalGuess];
const correct = ['3', '2', '1'];

const correctPlaces = guess.map((g, i) => {
  if (g === correct[i]) {
    correct[i] = NaN;
    guess[i] = NaN;
    return true;
  }
  return false;
});
const incorrectPlaces = guess.map((g, i) => {
  const correctIndex = correct.indexOf(g);
  if (correctIndex === -1) return false;
  correct[correctIndex] = NaN;
  return true;
});
const guessWithColors = originalGuess.map((g, i) => ({ sign: g, color: correctPlaces[i] ? 'g' : incorrectPlaces[i] ? 'y' : 'x' }));

console.log(guessWithColors);