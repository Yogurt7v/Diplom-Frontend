import style from "./busket.module.css";
// import Header from "../components/header/header";
// import SearchBar from "../components/search-bar/search-bar";
// import BusketCard from "../components/busket-card/busket-card";

export const Busket = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <SearchBar /> */}
      <div className={style.BusketWrapper}>
      <h2>Busket</h2>
        <div className={style.BusketCardSWrapper}>
        {/* <BusketCard />
        <BusketCard />
        <BusketCard /> */}
        </div>
      <div className={style.BusketSumWrapper}>
        <h3>Sum</h3>
        <div className={style.BusketSum}>Sum number</div>
        <button className={style.BusketButton}>lets go</button>
      </div>
      </div>
    </>
  );
};

export default Busket;
