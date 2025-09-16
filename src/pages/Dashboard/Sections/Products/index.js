    import { getProductsPerType, getProductsTypes } from "../../../../services/products";
    import { useEffect, useState } from "react";
    import { ReactComponent as FavoriteSVG } from "../../../../assets/Svg-Icons/favorite.svg";
    import styled from "styled-components"
    import DotLoading from "../../../../components/DotLoading";
    import SectionsTopBar from "../../../../components/SectionsTopBar";
    import SectionsContainer from "../../../../components/SectionsContainer";
    import FormModal from "../../../../components/FormModal";
    import SkeletonLoad from "../../../../components/SkeletonLoad";
import TextInput from "../../../../components/Inputs/TextInput";
import SelectInput from "../../../../components/Inputs/Select";
import { useApiResponse } from "../../../../hooks/ApiResponse/ApiContext";

    const ProductsContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        font-family: "Nunito Sans", sans-serif;
        width: 100%;
        height: 100%;
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        @media screen and (min-width: 740px){
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (min-width: 1200px){
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (min-width: 1500px){
            grid-template-columns: repeat(4, 1fr);
        }
    `

    const Product = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-self: center;
        align-items: flex-start;
        border-radius: 1rem;
        background-color: white;
        width: 100%;
        height: 100%;

        @media screen and (min-width: 550px) and (max-width: 740px){
            width: 80%;
        }

        @media screen and (min-width: 740px){
            width: 100%;
        }
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

    const ImageContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 1rem 1rem 0 0;
        height: 15rem;
        width: 100%;
    `

    const ProductImg = styled.img`
        border-radius: 1rem 1rem 0 0;
        height: 100%;
        width: 100%;
    `

    const FavoriteIcon = styled(FavoriteSVG)`
        cursor: pointer;
    `

    const AddButton = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--secondary-color);
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: var(--dashboard-secondary-color);

        &:hover{
            cursor: pointer;
        }
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
        const { setApiResponse, setApiResponseColor } = useApiResponse();
        const [loading, setLoading] = useState(true)
        const [imgLoad, setImgLoad] = useState(true)
        const [addProductOpen, setAddProductOpen] = useState(false)
        const [products, setProducts] = useState([])
        const [name, setName] = useState("");
        const [company, setCompany] = useState("");
        const [price, setPrice] = useState("");
        const [selectedOption, setSelectedOption] = useState("");
        const [typesList, setTypesList] = useState([]);

        async function fetchProducts() {
            setLoading(true);
            try {
                const response = await getProductsPerType("Pass");

                if(!response.success){
                    console.log(response.message);
                    return;
                }
                setProducts(response.products);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        async function fetchProductsTypes(){
            try {
                const response = await getProductsTypes();

                if(response.success){
                    setTypesList(response.types)
                }
            } catch (error) {
                
            }
        }

        useEffect(() => {
            fetchProducts();
            fetchProductsTypes();
        }, []);

        useEffect(() => {
            if(!addProductOpen){
                setName("");
                setCompany("");
                setPrice("");
                setSelectedOption("Select");
                setApiResponseColor("");
                setApiResponse("");
            }
        }, [addProductOpen, setApiResponse, setApiResponseColor]);

        const inputs = [
            {
                label: "Name",
                component: <TextInput value={name} setText={setName} placeholder={"Product name"} type={"text"} />
            },
            {
                label: "Company",
                component: <TextInput value={company} setText={setCompany} placeholder={"Product Company"} type={"text"} />
            },
            {
                label: "Price",
                component: <TextInput value={price} setText={setPrice} placeholder={"Product price"} type={"number"} />
            },
            {
                label: "Product Type",
                component:  <SelectInput 
                                list={typesList}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                            />
            }
        ];

        return loading ? ( 
                <SectionsContainer>
                    <DotLoading/>
                </SectionsContainer>
            ) : (
                <SectionsContainer>
                    <SectionsTopBar>
                        <h1>Products</h1>

                        <AddButton onClick={() => setAddProductOpen(true)}>
                            <p>Add Product</p>
                        </AddButton>
                    </SectionsTopBar>

                    <ProductsContainer>
                        {products.map(product => {
                            return(
                                <Product>
                                    <ImageContainer>
                                        {imgLoad && <SkeletonLoad/>}
                                            
                                        <ProductImg 
                                            src={`/travels/${product.source}.jpg`}
                                            alt="Product Image"
                                            onLoad={() => setImgLoad(false)}
                                            style={{display: imgLoad ? "none" : "block"}}
                                        />
                                    </ImageContainer>
                                    

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

                    <FormModal
                        isOpen={addProductOpen}
                        setIsOpen={setAddProductOpen}
                        title={"Add Product"}
                        subtitle={"Please fill in the details to add a new product."}
                        inputs={inputs}
                        loading={false}
                        action={() => {}}
                    />
                </SectionsContainer>
            )
    }

    export default ProductsSections