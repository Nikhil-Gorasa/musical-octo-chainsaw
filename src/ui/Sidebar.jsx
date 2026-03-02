import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 3.2rem 2.4rem;
	border-bottom: 1px solid var(--color-grey-100);

	grid-row-start: 1;
	grid-row-end: -1;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function Sidebar() {
	return (
		<StyledHeader>
			<Logo></Logo>
			<MainNav></MainNav>
		</StyledHeader>
	);
}

export default Sidebar;
