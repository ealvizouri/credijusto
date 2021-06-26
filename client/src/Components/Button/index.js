import styled from 'styled-components';
import { style } from "../../Utils";

const { colors } = style;

export default styled.button`
    background-color: ${colors.white};
    border: 2px solid ${colors.gray};
    color: ${colors.darkGray};
    padding: 10px 25px;
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        border-color: ${colors.gray};
    }
`;