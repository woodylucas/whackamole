import WhackAMole from "./components/WhackAMole";

export default function App() {
  return (
    <WhackAMole
      rows={3}
      cols={3}
      roundDuration={15}
      molesAtOnce={2}
      molesAppearingInterval={1500}
    />
  );
}
