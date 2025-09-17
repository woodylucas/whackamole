type GridCellProps = {
  filled: boolean;
  onClick: () => void;
};

export default function GridCell({ filled, onClick }: GridCellProps) {
  return (
    <button className="grid-cell" onClick={onClick}>
      <img
        src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
        alt="Mole Head"
        className={[
          "grid-cell-content",
          "mole-head",
          filled && "mole-head--visible",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <img
        src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
        alt="Mole Hill"
        className="grid-cell-content mole-hill"
      />
    </button>
  );
}
