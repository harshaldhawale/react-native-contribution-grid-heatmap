import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const ContributionGrid = ({
  title = "title",
  titleStyle = {},
  showTitle = true,
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
  showDate = true,
  showMonthLabels = true,
  showDayLabels = true,
}) => {
  const rows = 7; // Sunday to Saturday
  const today = new Date();

  // Calculate start (first visible Sunday) and end (upcoming Saturday)
  const daysSinceSunday = today.getDay();
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
    screenWidth -
    containerPadding * 2 -
    containerMargin * 2 -
    totalGapWidth -
    30; // space for day labels
  const adjustedCellSize = Math.min(cellSize, availableWidth / columns);

  const cellStyle = {
    width: adjustedCellSize,
    height: adjustedCellSize,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  };

  const monthLabels = [];
  let lastMonth = null;

  for (let c = 0; c < columns; c++) {
    const firstDateOfColumn = gridDates[c * rows];
    const monthName = firstDateOfColumn.toLocaleString("default", {
      month: "short",
    });

    if (monthName !== lastMonth) {
      monthLabels.push(monthName);
      lastMonth = monthName;
    } else {
      monthLabels.push(""); // Empty label for same month
    }
  }

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, margin: containerMargin, padding: containerPadding },
      ]}
    >
      {showTitle && <Text style={titleStyle}>{title}</Text>}

      {/* Month labels row */}
      {showMonthLabels && (
        <View
          style={{
            flexDirection: "row",
            // marginLeft: showDayLabels ? 30 : 0,
            marginBottom: 4,
          }}
        >
          {monthLabels.map((label, i) => (
            <View
              key={i}
              style={{
                width: adjustedCellSize,
                marginRight: gap,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 8, color: "#555" }}>{label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Main grid */}
      <View style={{ flexDirection: "row" }}>
        {/* Day labels column */}
        {showDayLabels && (
          <View style={{ marginRight: 4, justifyContent: "space-between" }}>
            {dayLabels.map((d, i) => (
              <Text
                key={i}
                style={{
                  fontSize: 8,
                  color: "#555",
                  height: adjustedCellSize,
                }}
              >
                {/* {i % 2 === 0 ? d : ""} Show alternate day labels */}
                {d}
              </Text>
            ))}
          </View>
        )}

        {/* Grid columns */}
        <View style={{ flexDirection: "row" }}>
          {Array.from({ length: columns }).map((_, col) => (
            <View
              key={col}
              style={{ flexDirection: "column", marginRight: gap }}
            >
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
                        borderWidth: isToday ? 1 : 0,
                        borderColor: isToday ? borderColor : "transparent",
                        marginBottom: gap,
                      },
                    ]}
                  >
                    {showDate && (
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 8,
                        }}
                      >
                        {date.getDate()}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
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
