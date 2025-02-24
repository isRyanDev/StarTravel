import styled from "styled-components";

const SeachBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    align-items: center;
    width: 25rem;
    height: 2.5rem;
    padding: 0 .75rem;
    gap: 1rem;
    border-radius: 19px;
    border: 0.6px solid var(--dashboard-border-color);
    background: #F5F6FA;
`;

const SearchLupe = styled.button`
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    border: none;
    background: none;

    &:hover{
        cursor: pointer;
    }
`

const SearchInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    font-family: "Nunito Sans";
    font-size: 1rem;
    font-weight: 400;

    &:focus{
        outline: none;
    }
`;

function SeachBar() {
    return (
        <SeachBarContainer>
            <SearchLupe>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <g opacity="0.5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.69355 12.5352C12.4234 11.375 13.6959 8.22157 12.5357 5.49174C11.3756 2.7619 8.2221 1.48942 5.49227 2.64957C2.76243 3.80972 1.48995 6.96318 2.6501 9.69302C3.81025 12.4229 6.96372 13.6953 9.69355 12.5352Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.3902 11.3896L15.5556 15.5555" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
            </SearchLupe>

            <SearchInput type="text" placeholder="Search"/>
        </SeachBarContainer>
    );
}

export default SeachBar;