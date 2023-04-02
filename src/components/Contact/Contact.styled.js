import styled from 'styled-components';

export const DeleteButton = styled.button`
  width: 75px;
  height: 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  background-color: #8b7e74;
  font-size: 15px;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 4px 4px rgb(0 0 0 / 15%);
  &:hover,
  &:focus {
    border-color: #579bb1;
    background-color: #7d7168;
    color: #ffffff;
  }
`;
