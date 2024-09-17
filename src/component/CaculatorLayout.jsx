import { evaluate } from "mathjs";
import { useReducer } from "react";
import styled, { createGlobalStyle } from "styled-components";

const StyledButton = styled.button`
    padding: 1.2rem 1rem;
    color: white;
    --tw-bg-opacity: 1;
    background-color: ${props => props.bgColor || '#4b5563'};
    border: 1px solid black;
    &:hover{
        --tw-bg-opacity: 1;
        background-color: ${props => props.hoverColor || '#4b5563'};
        color: black;
        --tw-border-opacity: 1;
        border-color: rgb(229 231 235 / var(--tw-border-opacity));
    }
`;
const StyledAC = styled(StyledButton)`
    grid-column: span 2 / span 2;
`;

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Digital-7';
        src: url('../../public/font/digital-7.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;

const StyledOutput = styled.div`
font-family: 'Digital-7', sans-serif;
`;

const initialState = {
    expression: '',
    inputValue: '',
    isResult: false,
    lastResult: ''
};

const calculatorReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INPUT':
            if (state.isResult) {
                return {
                    ...state,
                    expression: action.payload,
                    inputValue: action.payload,
                    isResult: false,
                };
            }
            return {
                ...state,
                expression: state.expression + action.payload,
                inputValue: action.payload,
            };

        case 'CLEAR':
            return {
                expression: '',
                inputValue: '',
                isResult: false,
                lastResult: '',
            };

        case 'EVALUATE':
            try {
                const result = evaluate(state.expression);
                return {
                    ...state,
                    expression: state.expression + '=' + result,
                    inputValue: String(result),
                    isResult: true,
                    lastResult: String(result),
                };
            } catch {
                return {
                    ...state,
                    inputValue: 'Error',
                    isResult: true,
                };
            }

        case 'REPLACE_LAST_RESULT':
            return {
                ...state,
                expression: state.lastResult + action.payload,
                inputValue: action.payload,
                isResult: false,
            };

        default:
            return state;
    }
};

const CaculatorLayout = () => {

    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    const handleButtonClick = (value) => {
        if (value === 'AC') {
            dispatch({ type: 'CLEAR' });
        } else if (value === '=') {
            dispatch({ type: 'EVALUATE' });
        } else {
            if (state.isResult) {
                dispatch({ type: 'REPLACE_LAST_RESULT', payload: value });
            } else {
                dispatch({ type: 'ADD_INPUT', payload: value });
            }
        }
    };
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-300">
                <div className=" bg-black w-[330px] h-[390px] p-1">
                    <GlobalStyle />
                    <StyledOutput className="text-xl text-right text-yellow-500 bg-gray-800">
                        {state.expression || '0'}
                    </StyledOutput>
                    <StyledOutput className="text-2xl text-right text-white bg-gray-800 ">
                        {state.inputValue || '0'}
                    </StyledOutput>
                    <div className="grid grid-cols-4 gap-0 p-0 bg-gray-900 rounded-b-lg">
                        <StyledAC bgColor="#c9302c" hoverColor="#c9302c" onClick={() => handleButtonClick('AC')}>AC</StyledAC>
                        <StyledButton bgColor="#6b7280" onClick={() => handleButtonClick('/')}>/</StyledButton>
                        <StyledButton bgColor="#6b7280" onClick={() => handleButtonClick('*')}>x</StyledButton>

                        <StyledButton onClick={() => handleButtonClick('7')}>7</StyledButton>
                        <StyledButton onClick={() => handleButtonClick('8')}>8</StyledButton>
                        <StyledButton onClick={() => handleButtonClick('9')}>9</StyledButton>
                        <StyledButton bgColor="#6b7280" onClick={() => handleButtonClick('-')}>-</StyledButton>

                        <StyledButton onClick={() => handleButtonClick('4')}>4</StyledButton>
                        <StyledButton onClick={() => handleButtonClick('5')}>5</StyledButton>
                        <StyledButton onClick={() => handleButtonClick('6')}>6</StyledButton>
                        <StyledButton bgColor="#6b7280" onClick={() => handleButtonClick('+')}>+</StyledButton>

                        <StyledButton onClick={() => handleButtonClick('1')}>1</StyledButton>
                        <StyledButton onClick={() => handleButtonClick('2')}>2</StyledButton>
                        <StyledButton onClick={() => handleButtonClick('3')}>3</StyledButton>
                        <StyledButton className="row-span-2" bgColor="#2563eb" hoverColor="#2563eb" onClick={() => handleButtonClick('=')}>=</StyledButton>

                        <StyledButton className="col-span-2" onClick={() => handleButtonClick('0')}>0</StyledButton>
                        <StyledButton onClick={() => handleButtonClick('.')}>.</StyledButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CaculatorLayout