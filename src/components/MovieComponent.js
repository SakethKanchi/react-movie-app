import styled from "styled-components"

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 280px;
    box-shadow: 0 3px 10px 0 #aaa;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
    box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
    &:hover {
        box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
        transform: scale(1.05, 1.05);  
    }
`;
const CoverImage = styled.img`
    height: 400px;
    object-fit: cover;
`;
const MovieName = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
const InfoColumn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const MovieInfo = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: black;
    text-transform: capitalize;
`;
const MovieComponent = (props) => {
    const {Title, Year, imdbID, Type, Poster} = props.movie;
    return (
        <MovieContainer 
            onClick={() => {
                props.onMovieSelect(imdbID);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        >
            <CoverImage src = {Poster} alt ="https://via.placeholder.com/400"/>
            <MovieName>{Title}</MovieName>
            <InfoColumn>
                <MovieInfo>Year: {Year}</MovieInfo>
                <MovieInfo>Type: {Type}</MovieInfo>
            </InfoColumn>
        </MovieContainer>
    )
}
export default MovieComponent