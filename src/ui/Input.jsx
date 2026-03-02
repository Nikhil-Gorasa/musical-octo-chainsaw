import styled from "styled-components";

const Input = styled.input`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border-radius: var(--border-radius-sm);
	border: 1px solid var(--color-grey-300);
	background-color: var(--color-grey-0);
	color: var(--color-grey-900);

	transition:
		border-color 0.2s,
		box-shadow 0.2s;

	&:focus {
		outline: none;
		border-color: var(--color-brand-600);
	}

	&::placeholder {
		color: var(--color-grey-400);
	}

	&:disabled {
		background-color: var(--color-grey-100);
		cursor: not-allowed;
	}
`;

export default Input;
