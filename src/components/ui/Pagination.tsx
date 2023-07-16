import React, {FC} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {usePagination, DOTS, useOrientation} from '../../hooks';
import {palette} from '../../styles';
import Icon from 'react-native-vector-icons/Octicons';

type PaginationProps = {
  total: number;
  buttonConst: number;
  siblingCount: number;
  currentPage: number;
  contentPerPage: number;
  limit: number;
  paginate: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  total,
  currentPage,
  buttonConst,
  siblingCount,
  paginate,
}) => {
  const {width} = useOrientation();
  const paginationRange = usePagination({
    total,
    buttonConst,
    siblingCount,
    currentPage,
  });

  const changePage = (pageNumber: number) => {
    paginate(pageNumber);
  };

  const shouldShowArrow = width > 350;

  return (
    <View style={styles.pagination} accessibilityLabel="pagination">
      {currentPage > 1 && shouldShowArrow && (
        <TouchableOpacity
          accessibilityLabel="previous"
          onPress={() => paginate(currentPage - 1)}>
          <Icon name="arrow-left" size={20} color={palette.whiteColor} />
        </TouchableOpacity>
      )}

      {paginationRange &&
        paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <TouchableOpacity key={index}>
                <Text style={styles.text}>&#8230;</Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              accessibilityLabel={`page ${item}`}
              key={index}
              onPress={() => changePage(Number(item))}
              style={[
                styles.paginationButton,
                currentPage === item && styles.activeButton,
              ]}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          );
        })}

      {currentPage !== total && shouldShowArrow && (
        <TouchableOpacity
          accessibilityLabel="next"
          onPress={() => paginate(currentPage + 1)}
          style={styles.paginationButton}>
          <Icon name="arrow-right" size={20} color={palette.whiteColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  paginationButton: {
    minWidth: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: palette.accentColor,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: palette.whiteColor,
    fontWeight: '600',
  },
});

export default Pagination;
