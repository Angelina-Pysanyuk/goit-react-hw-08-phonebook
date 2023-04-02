import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  color: #579bb1;
  font-size: 24px;
  font-weight: 600;
  & span {
    font-size: 20px;
    font-weight: 400;
  }
  & input {
    width: 200px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 16px;
  }
`;
