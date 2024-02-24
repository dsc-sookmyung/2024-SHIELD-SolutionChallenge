import styled from "styled-components";
import theme from "../styles/theme";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

const StyledHeader = styled.header` 
    height: 6vh;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${theme.colors.mainNavy};
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    z-index: 0;
`

const Header = () => {
    return(
        <StyledHeader>
            <Link to="/main">
                <div className="home">
                    <FontAwesomeIcon icon={faHouse} />
                </div>
            </Link>

            <Link to="/reportlist">
                <div className="reportlist">
                    <FontAwesomeIcon icon={faFile} /> Report
                </div>
            </Link>

            <Link to="/mypage">
                <div className="my">
                    <FontAwesomeIcon icon={faUser} /> Mypage
                </div>
            </Link>
        </StyledHeader>
    )
}

export default Header