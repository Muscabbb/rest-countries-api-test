import Filter from "./Components/filter";
import NavBar from "./Components/navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="container mt-[80px] mx-auto flex justify-between items-center">
        <Filter />
      </div>
    </>
  );
}
