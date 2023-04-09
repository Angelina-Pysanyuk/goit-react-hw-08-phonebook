import PropTypes from "prop-types";
import { setFilter } from "redux/filterSlice";
import { useDispatch } from "react-redux";
import { Box, FormControl, Input } from "@chakra-ui/react";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <Box my="5">
      <FormControl htmlFor="">
        <span>Find contacts by name</span>
        <Input
          type="text"
          onChange={(event) => {
            dispatch(setFilter(event.target.value));
          }}
        />
      </FormControl>
    </Box>
  );
};

Filter.propTypes = { onFilterContacts: PropTypes.func };

export default Filter;
