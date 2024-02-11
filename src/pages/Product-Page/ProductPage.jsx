import Header from "../components/header/Header";
import SearchBar from "../components/search-bar/SearchBar";
import ProductPath from "../components/product-path/ProductPath";
import ProductItem from "../components/product-item/ProductItem";


export const ProductPage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <ProductPath/>
            <ProductItem/>
        </div>
    );
}

export default ProductPage