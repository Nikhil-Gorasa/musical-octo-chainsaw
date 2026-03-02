import React from "react";
import styled from "styled-components";

const StyledRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
`;

const Row = ({ children, className = "", ...props }) => {
	return (
		<StyledRow className={className} {...props}>
			{children}
		</StyledRow>
	);
};

export default Row;
