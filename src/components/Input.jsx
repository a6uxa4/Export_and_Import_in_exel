import React from 'react'
import styled from 'styled-components'

function Input(props) {
	return (
		<div>
			<StyledLable htmlFor={props.label}>{props.label}</StyledLable>
			<InputStyled
				type={props.type || 'text'}
				onChange={props.onChange}
				value={props.value == null || '' ? '' : props.value}
				placeholder={props.placeholder}
				autoComplete='off'
				disabled={props.disabled}
				{...props}
			/>
		</div>
	)
}

const StyledLable = styled.label`
	font-family: 'PT Sans', sans-serif;
	font-size: 14px;
	font-weight: 400;
	color: #87939e;
`

const InputStyled = styled.input`
	width: ${({ width }) => width || '100%'};
	height: ${({ height }) => height || ''};
	max-width: ${({ maxWidth }) => maxWidth || '100%'};
	min-width: ${({ minWidth }) => minWidth || '100%'};
	padding: ${({ padding }) => padding || '10px'};
	border-radius: ${({ borderRadius }) => borderRadius || '5px'};
	letter-spacing: 0.6px;
	color: grey;
	font-weight: bold;
	font-size: 16px;
	font-weight: 400;
	outline: none;
	transition: 0.2s;
	background-color: ${({ background }) => background || '#ffffff'};
	border: ${({ border }) => border || '1px solid #ced4da'};
	::placeholder {
		color: #d0d2d3;
	}
	:active {
		border: 1px solid rgba(31, 88, 174, 0.6);
	}
	:focus {
		border: 1px solid rgba(31, 88, 174, 0.6);
	}
	:disabled,
	:disabled:hover {
		opacity: 0.5;
		cursor: not-allowed;
	}
	-webkit-appearance: none;
`

export default Input
