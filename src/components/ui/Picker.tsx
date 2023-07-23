import React, {FC, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {palette} from '../../styles';

type DataType = {
  label: string;
  value: string;
};

type PickerProps = {
  value: string;
  onValueChange: (value: string) => void;
  data: DataType[];
  dropdownIconColor?: string;
};

const CustomPicker: FC<PickerProps> = ({
  value,
  onValueChange,
  data,
  dropdownIconColor,
}) => {
  const pickerRef = useRef<Picker<string> | null>(null);

  const handlePickerValueChange = (newValue: string) => {
    onValueChange(newValue);
    pickerRef.current?.focus();
  };

  return (
    <Picker
      selectedValue={value}
      onValueChange={handlePickerValueChange}
      mode="dropdown"
      style={styles.picker}
      dropdownIconColor={dropdownIconColor}>
      {data.map(item => {
        return (
          <Picker.Item key={item.value} value={item.value} label={item.label} />
        );
      })}
    </Picker>
  );
};
export default CustomPicker;

const styles = StyleSheet.create({
  picker: {
    height: 30,
    width: 130,
    backgroundColor: 'transparent',
    color: palette.whiteColor,
  },
});
