import styled from "styled-components";

const LoginDiv = styled.div`
display: grid;
place-items: center;
& .login__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgb(var(--primary-color), 0.5);
  box-shadow: 0 0 20px rgb(var(--primary-color), 0.5);
  & h1 {
    align-self: flex-start;
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: 700;
    border-left: 0.5rem solid rgb(var(--primary-color));
    padding-left: 0.625rem;
  }
  & form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    padding-block: 1rem;
    width: 100%;
  }
}
`;

export default LoginDiv;
