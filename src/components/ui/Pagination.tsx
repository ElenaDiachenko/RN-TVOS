import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {usePagination, DOTS, useOrientation} from '../../hooks';
import {palette} from '../../styles';
import {Focused} from '../ui';

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

  const createButtonStyle = (item: string | number) => {
    const commonStyle = {...styles.paginationButton};
    const activeStyle = currentPage == item ? styles.activeButton : {};

    return {...commonStyle, ...activeStyle};
  };

  return (
    <View style={styles.pagination} accessibilityLabel="pagination">
      {currentPage > 1 && shouldShowArrow && (
        <Focused
          style={styles.paginationButton}
          accessibilityLabel="previous"
          handlePress={() => paginate(currentPage - 1)}>
          <Icon name="arrow-left" size={20} color={palette.whiteColor} />
        </Focused>
      )}

      {paginationRange &&
        paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <Focused key={index} style={styles.paginationButton}>
                <Text style={styles.text}>&#8230;</Text>
              </Focused>
            );
          }
          return (
            <Focused
              accessibilityLabel={`page ${item}`}
              key={index}
              handlePress={() => changePage(Number(item))}
              style={createButtonStyle(item)}>
              <Text style={styles.text}>{item}</Text>
            </Focused>
          );
        })}

      {currentPage !== total && shouldShowArrow && (
        <Focused
          accessibilityLabel="next"
          handlePress={() => paginate(currentPage + 1)}
          style={styles.paginationButton}>
          <Icon name="arrow-right" size={20} color={palette.whiteColor} />
        </Focused>
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
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
