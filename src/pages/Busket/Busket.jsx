import style from "./Busket.module.css";
import Header from "../components/header/Header";
import SearchBar from "../components/search-bar/SearchBar";
import BusketCard from "../components/busket-card/busketCard";

export const Busket = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <h2>Busket</h2>
      <div className={style.BusketWrapper}>
        <div className={style.BusketCardSWrapper}>
        <BusketCard />
        <BusketCard />
        <BusketCard />
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
