import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
        font-family: 'Exo', sans-serif;

    }

    body{
        background-color: #192232;
        font-size: 1.2rem;
        
        ::-webkit-scrollbar{
            background-color: #4f6877;
        }
        ::-webkit-scrollbar-track{
            width: 8px;
        }
        ::-webkit-scrollbar-thumb{
            background: linear-gradient(#0C3833, #269F91);
            border-radius: 90px;
            height: 100px;


        }
    }

    input::placeholder{
          color: white;
          opacity: 0.6;
        }

    input, a {
        font-family: inherit;
    }

    .header form .input-control:focus-within{
        width: 100%;
    }

    .logo{
        font-family: 'Pacifico', cursive;
        font-size: 2rem;
        padding: 1rem;
        color: white;
    }
`;

export default GlobalStyle