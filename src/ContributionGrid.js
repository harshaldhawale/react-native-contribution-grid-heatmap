import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ Enhanced HEX → RGB converter (supports #RGB and #RRGGBB)
const hexToRgb = (hex) => {
  const sanitized = hex.replace("#", "");
  const fullHex =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((c) => c + c)
          .join("")
      : sanitized;

  const bigint = parseInt(fullHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

// ✅ Lighten/Darken a color based on factor
const shadeColor = (color, factor) => {
  const [r, g, b] = hexToRgb(color);
  const mix = (c) =>
    Math.min(255, Math.max(0, Math.floor(c * factor + 255 * (1 - factor))));
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

const ContributionGrid = ({
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
  showDate = true,
  dateStyle = {},
  showMonthLabels = true,
  showDayLabels = true,
  showHeatmap = true,

  // ✅ New Props for Action Button
  showActionButton = false,
  actionButtonTitle = "Action",
  actionButtonStyle = {},
  actionButtonTextStyle = {},
  onActionPress = () => {},
}) => {
  const rows = 7;
  const today = new Date();

  // --- Generate 5 dynamic heatmap shades ---
  const heatmapColors = [
    shadeColor(activeColor, 0.2),
    shadeColor(activeColor, 0.4),
    shadeColor(activeColor, 0.6),
    shadeColor(activeColor, 0.8),
    shadeColor(activeColor, 1.0),
  ];

  // --- Calculate visible range ---
  const daysSinceSunday = today.getDay();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - daysSinceSunday));
  const firstVisibleDate = new Date(endDate);
  firstVisibleDate.setDate(endDate.getDate() - (columns * 7 - 1));

  // --- Generate grid dates ---
  const gridDates = Array.from({ length: columns * 7 }, (_, i) => {
    const d = new Date(firstVisibleDate);
    d.setDate(firstVisibleDate.getDate() + i);
    return d;
  });

  // --- Create contribution map for fast lookup ---
  const contributionMap = {};
  data.forEach((item) => {
    const key = new Date(item.date).toDateString();
    contributionMap[key] = {
      contributed: !!item.contributed,
      level: item.level ?? 1,
    };
  });

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
    30;
  const adjustedCellSize = Math.min(cellSize, availableWidth / columns);

  const cellStyle = {
    width: adjustedCellSize,
    height: adjustedCellSize,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  };

  // --- Month and Day Labels ---
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
      monthLabels.push("");
    }
  }
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // --- Get cell color ---
  const getCellColor = (dateKey, isFuture) => {
    if (isFuture) return inactiveColor;
    const entry = contributionMap[dateKey];
    if (!entry || !entry.contributed) return inactiveColor;

    if (!showHeatmap) return activeColor;

    const { level } = entry;
    const index = Math.min(Math.max(level, 1), 5) - 1;
    return heatmapColors[index];
  };

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

      {/* ✅ Action Button */}
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

      {/* Month labels */}
      {showMonthLabels && (
        <View
          style={{
            flexDirection: "row",
            marginLeft: showDayLabels ? 20 : 0,
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

      {/* Grid section */}
      <View style={{ flexDirection: "row" }}>
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

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 8,
  },
});

export default ContributionGrid;
