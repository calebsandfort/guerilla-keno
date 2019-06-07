const print = game => {
  console.table([
    {
      date: game.dateDisplay,
      draw: game.draw,
      numbers: game.numbers
    }
  ]);
};

export default {
  print
};
