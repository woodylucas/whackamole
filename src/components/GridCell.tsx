export default function GridCell() {
  return (
    <button className="grid-cell">
      <img
        src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
        alt="Mole Head"
        className="grid-cell-content mole-head"
      />
      <img
        src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
        alt="Mole Hill"
        className="grid-cell-content mole-hill"
      />
    </button>
  );
}
