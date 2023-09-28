[
  { color: "pink", val: 2 },
  { color: "blue", val: 6 },  // <-- re-roll yet keep color
  { color: "tan", val: 5 },
]

function reroll(pos) {
  setDice(curr =>
    curr.map( (die, i) =>
      i === pos
        ? { ...die, val: d6() }
        : die
      ));
}