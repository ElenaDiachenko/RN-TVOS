import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {palette} from '../../styles';
import Picker from './Picker';
import Focused from './Focused';
import {useFocusState} from '../../hooks';

type SortPropsType = {
  data: DataType[];
  handleChange: ChangeHandler;
  sortState: SortStateType;
};

type ChangeHandler = (newSortState: SortStateType) => void;
type DataType = {
  label: string;
  value: string;
};
type SortStateType = {
  sort: string;
  order: string;
};

const Sort: FC<SortPropsType> = ({data, handleChange, sortState}) => {
  const [isFocusedOrder, handleFocusChangeOrder] = useFocusState();
  const handleSortChange = (newSortValue: string) => {
    const newSort = {order: '1', sort: newSortValue};
    handleChange(newSort);
  };

  const handleOrderChange = () => {
    const newOrder = sortState.order === '1' ? '-1' : '1';
    const newSort = {...sortState, order: newOrder};
    handleChange(newSort);
  };

  return (
    <View style={styles.container}>
      <Picker
        value={sortState.sort}
        onValueChange={handleSortChange}
        data={data}
        dropdownIconColor={palette.whiteColor}
      />

      <Focused
        handlePress={handleOrderChange}
        onFocus={() => handleFocusChangeOrder(true)}
        onBlur={() => handleFocusChangeOrder(false)}>
        <Octicons
          name="arrow-switch"
          size={24}
          color={isFocusedOrder ? palette.accentColor : palette.whiteColor}
          style={styles.arrowIcon}
        />
      </Focused>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowIcon: {
    transform: [{rotate: '90deg'}],
  },
});
