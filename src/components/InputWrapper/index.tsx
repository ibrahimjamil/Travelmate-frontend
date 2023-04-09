import { Input, InputWrapper } from '@mantine/core';

type InputWrapperComponent = {
	label: string;
	error?: string;
	required?: boolean;
	description?: string;
	placeholder: string;
	value: string;
	handleChange: any;
	size?: 'md' | 'lg' | 'xl' | 'sm';
	className: any;
	onKeyDown?: (e: any) => void;
};

const InputWrapperComponent = (props: InputWrapperComponent) => {
	const { label, error, value, handleChange, required, description, placeholder, size, className, onKeyDown } = props;

	return (
		<InputWrapper
			id="input-demo"
			required={required}
			label={label}
			description={description ? description : ''}
			error={error ? error : ''}
		>
			<Input
				id="input-demo"
				className={className}
				size={size ?? 'md'}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				onKeyDown={onKeyDown}
			/>
		</InputWrapper>
	);
};

export default InputWrapperComponent;
