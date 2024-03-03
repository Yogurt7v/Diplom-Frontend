import {ProductItem, ProductPath, SearchBar, Header} from "../components/index.js"


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