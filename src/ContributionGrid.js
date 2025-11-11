import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const ContributionGrid = ({
  data = [], // Example: [{ date: '2025-11-08', contributed: true }]
  activeColor = "#4CAF50",
  inactiveColor = "#E0E0E0",
  backgroundColor = "#F8F8F8",
  borderColor = "#4CAF50",
  containerPadding = 5,
  containerMargin = 10,
  cellSize = 20,
  gap = 4,
  columns = 16,
}) => {
  const rows = 7; // Sunday to Saturday
  const today = new Date();

  // Calculate start (first visible Sunday) and end (upcoming Saturday)
  const daysSinceSunday = today.getDay(); // 0=Sun
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - daysSinceSunday));
  const firstVisibleDate = new Date(endDate);
  firstVisibleDate.setDate(endDate.getDate() - (columns * 7 - 1));

  // Generate all dates to display
  const gridDates = Array.from({ length: columns * 7 }, (_, i) => {
    const d = new Date(firstVisibleDate);
    d.setDate(firstVisibleDate.getDate() + i);
    return d;
  });

  // Convert input data into a map for faster lookup
  const contributionMap = {};
  data.forEach((item) => {
    const dateKey = new Date(item.date).toDateString();
    contributionMap[dateKey] = item.contributed;
  });

  // Helpers
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const screenWidth = Dimensions.get("window").width;
  const totalGapWidth = gap * (columns - 1);
  const availableWidth =
    screenWidth - containerPadding * 2 - containerMargin * 2 - totalGapWidth;
  const adjustedCellSize = Math.min(cellSize, availableWidth / columns);

  const cellStyle = {
    width: adjustedCellSize,
    height: adjustedCellSize,
    borderRadius: 4,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          margin: containerMargin,
          padding: containerPadding,
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        {Array.from({ length: columns }).map((_, col) => (
          <View key={col} style={{ flexDirection: "column", marginRight: gap }}>
            {Array.from({ length: rows }).map((_, row) => {
              const index = col * rows + row;
              const date = gridDates[index];
              const dateKey = date.toDateString();
              const isToday = isSameDay(date, today);
              const isFuture = date > today;
              const active = contributionMap[dateKey] === true;

              return (
                <View
                  key={row}
                  style={[
                    cellStyle,
                    {
                      backgroundColor: isFuture
                        ? inactiveColor
                        : active
                        ? activeColor
                        : inactiveColor,
                      borderWidth: isToday ? 2 : 0,
                      borderColor: isToday ? borderColor : "transparent",
                      marginBottom: gap,
                    },
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 8,
  },
});

export default ContributionGrid;
