import { getProducts } from "../../../../services/products";
import { useEffect, useState } from "react";
import { ReactComponent as FavoriteSVG } from "../../../../assets/Svg-Icons/favorite.svg";
import styled from "styled-components"
import Loading from "../../../../components/Loading";
import SectionsTopBar from "../../../../components/SectionsTopBar";
import SectionsContainer from "../../../../components/SectionsContainer";

const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    font-family: "Nunito Sans", sans-serif;
    height: 100%;
`

const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 1rem;
    background-color: #fff;
`

const InformationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    gap: .5rem;
    width: 100%;
    padding: 1rem;
`

const ProductInformations = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
`

const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const ProductText = styled.p`
    font-size: 1.125rem;
    font-weight: 700;
    color: ${props => props.color ? props.color : "black"};
`

const ProductImg = styled.img`
    border-radius: 1rem 1rem 0 0;
    width: 100%;
`

const FavoriteIcon = styled(FavoriteSVG)`
    cursor: pointer;
`

const EditButton = styled.div`
    border-radius: 1rem;
    background-color: #E2EAF8;
    color: black;
    font-weight: 700;
    padding: .5rem 1.2rem;
    cursor: pointer;
`

function ProductsSections(){
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await getProducts("Pass");

            if(!response.success){
                console.log(response.message);
                return;
            }

            console.log(response);

            setProducts(response.products);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return loading ? ( 
            <SectionsContainer>
                <Loading/>
            </SectionsContainer>
        ) : (
            <SectionsContainer>
                <SectionsTopBar>
                    <h1>Products</h1>
                </SectionsTopBar>

                <ProductsContainer>
                    {products.map(product => {
                        return(
                            <Product>
                                <ProductImg src={`/travels/${product.source}.jpg`} alt="Product Image" />

                                <InformationsContainer>
                                    <ProductInformations>
                                        <InfosContainer>
                                            <ProductText>{product.name}</ProductText>
                                            <ProductText color="var(--background)">{product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</ProductText>
                                        </InfosContainer>
                                        <FavoriteIcon/>
                                    </ProductInformations>

                                    <ProductInformations>
                                        <EditButton>
                                            <p>Edit Product</p>
                                        </EditButton>
                                    </ProductInformations>
                                </InformationsContainer>
                            </Product>
                        )
                    })}
                </ProductsContainer>


            </SectionsContainer>
        )
}

export default ProductsSections