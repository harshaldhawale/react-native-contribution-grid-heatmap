import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ContributionGridProps } from "../types/contribution";

// ----------------- Color Utils -----------------
const hexToRgb = (hex: string): [number, number, number] => {
  const sanitized = hex.replace("#", "");
  const fullHex =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((c) => c + c)
          .join("")
      : sanitized;

  const bigint = parseInt(fullHex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const shadeColor = (color: string, factor: number): string => {
  const [r, g, b] = hexToRgb(color);
  const mix = (c: number) =>
    Math.min(255, Math.max(0, Math.floor(c * factor + 255 * (1 - factor))));

  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

// ----------------- Component -----------------
const ContributionGrid: React.FC<ContributionGridProps> = ({
  title = "Contributions",
  titleStyle = {},
  showTitle = true,
  data = [],
  activeColor = "#4CAF50",
  inactiveColor = "#E0E0E0",
  backgroundColor = "#F8F8F8",
  borderColor = "#4CAF50",
  containerPadding = 5,
  containerMargin = 10,
  cellSize = 20,
  gap = 4,
  columns = 16,
  showDate = false,
  dateStyle = {},
  showMonthLabels = true,
  showDayLabels = true,
  showHeatmap = true,

  // Action Button Props
  showActionButton = false,
  actionButtonTitle = "Action",
  actionButtonStyle = {},
  actionButtonTextStyle = {},
  onActionPress = () => {},
}) => {
  const rows = 7;
  const today = new Date();

  // Dynamic heatmap shades
  const heatmapColors = [
    shadeColor(activeColor, 0.2),
    shadeColor(activeColor, 0.4),
    shadeColor(activeColor, 0.6),
    shadeColor(activeColor, 0.8),
    shadeColor(activeColor, 1.0),
  ];

  // Calculate visible date range
  const daysSinceSunday = today.getDay();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - daysSinceSunday));

  const firstVisibleDate = new Date(endDate);
  firstVisibleDate.setDate(endDate.getDate() - (columns * 7 - 1));

  const gridDates: Date[] = Array.from({ length: columns * 7 }, (_, i) => {
    const d = new Date(firstVisibleDate);
    d.setDate(firstVisibleDate.getDate() + i);
    return d;
  });

  // Contribution lookup map
  const contributionMap: Record<
    string,
    { contributed: boolean; level: number }
  > = {};
  data.forEach((item) => {
    const key = new Date(item.date).toDateString();
    contributionMap[key] = {
      contributed: item.contributed,
      level: item.level ?? 1,
    };
  });

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // Cell size calculation
  const screenWidth = Dimensions.get("window").width;
  const totalGapWidth = gap * (columns - 1);

  const availableWidth =
    screenWidth -
    containerPadding * 2 -
    containerMargin * 2 -
    totalGapWidth -
    30;

  const adjustedCellSize = Math.min(cellSize, availableWidth / columns);

  const cellStyle: ViewStyle = {
    width: adjustedCellSize,
    height: adjustedCellSize,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  };

  // Month & Day labels
  const monthLabels: string[] = [];
  let lastMonth: string | null = null;

  for (let c = 0; c < columns; c++) {
    const date = gridDates[c * rows];
    const monthName = date.toLocaleString("default", { month: "short" });

    monthLabels.push(monthName !== lastMonth ? monthName : "");
    lastMonth = monthName;
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getCellColor = (dateKey: string, isFuture: boolean): string =>
    isFuture
      ? inactiveColor
      : contributionMap[dateKey]?.contributed
      ? showHeatmap
        ? heatmapColors[
            Math.min(Math.max(contributionMap[dateKey].level, 1), 5) - 1
          ]
        : activeColor
      : inactiveColor;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, margin: containerMargin, padding: containerPadding },
      ]}
    >
      {/* Title */}
      {showTitle && (
        <Text style={[{ fontWeight: "bold", marginBottom: 5 }, titleStyle]}>
          {title}
        </Text>
      )}

      {/* Optional Action Button */}
      {showActionButton && (
        <TouchableOpacity
          style={[
            {
              backgroundColor: activeColor,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 6,
              alignSelf: "flex-end",
              marginBottom: 8,
            },
            actionButtonStyle,
          ]}
          onPress={onActionPress}
        >
          <Text
            style={[
              { color: "#fff", fontWeight: "600" },
              actionButtonTextStyle,
            ]}
          >
            {actionButtonTitle}
          </Text>
        </TouchableOpacity>
      )}

      {/* Month Labels */}
      {showMonthLabels && (
        <View
          style={{
            flexDirection: "row",
            marginLeft: showDayLabels ? 20 : 0,
            marginBottom: 4,
          }}
        >
          {monthLabels.map((m, i) => (
            <View
              key={i}
              style={{
                width: adjustedCellSize,
                marginRight: gap,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 8, color: "#555" }}>{m}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Day labels + Grid */}
      <View style={{ flexDirection: "row" }}>
        {showDayLabels && (
          <View style={{ marginRight: 4, justifyContent: "space-between" }}>
            {dayLabels.map((d, i) => (
              <Text
                key={i}
                style={{ fontSize: 8, color: "#555", height: adjustedCellSize }}
              >
                {d}
              </Text>
            ))}
          </View>
        )}

        {/* Columns */}
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

                return (
                  <View
                    key={row}
                    style={[
                      cellStyle,
                      {
                        backgroundColor: getCellColor(dateKey, isFuture),
                        borderWidth: isToday ? 1 : 0,
                        borderColor: isToday ? borderColor : "transparent",
                        marginBottom: gap,
                      },
                    ]}
                  >
                    {showDate && (
                      <Text style={dateStyle}>{date.getDate()}</Text>
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

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 8,
  } as ViewStyle,
});

export default ContributionGrid;
