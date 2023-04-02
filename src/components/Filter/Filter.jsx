import PropTypes from 'prop-types';
import { StyledLabel } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <StyledLabel htmlFor="">
        <span>Find contacts by name</span>
        <input
          type="text"
          onChange={event => {
            dispatch(setFilter(event.target.value));
          }}
        />
      </StyledLabel>
    </div>
  );
};

Filter.propTypes = { onFilterContacts: PropTypes.func };

export default Filter;
