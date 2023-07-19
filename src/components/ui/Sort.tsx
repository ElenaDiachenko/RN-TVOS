import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {Picker} from '@react-native-picker/picker';
import {palette} from '../../styles';

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
        selectedValue={sortState.sort}
        onValueChange={handleSortChange}
        mode="dropdown"
        style={styles.picker}
        dropdownIconColor={palette.whiteColor}>
        {data.map(item => {
          return (
            <Picker.Item
              key={item.value}
              value={item.value}
              label={item.label}
              style={styles.pickerItem}
            />
          );
        })}
      </Picker>

      <TouchableOpacity onPress={handleOrderChange}>
        <Octicons
          name="arrow-switch"
          size={24}
          color={palette.accentColor}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  picker: {
    height: 30,
    width: 130,
    backgroundColor: 'transparent',
    color: palette.whiteColor,
  },
  pickerItem: {
    fontSize: 16,
    backgroundColor: palette.mainBgColor,
    color: palette.whiteColor,
  },
  arrowIcon: {
    transform: [{rotate: '90deg'}],
  },
});
