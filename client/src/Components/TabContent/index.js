import styled from "styled-components";
import { style } from "../../Utils";

const { medias } = style;

const TabContent = styled.div`
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (min-width: ${medias.md}px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

export default TabContent;