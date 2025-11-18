# 🟩 React Native Contribution Grid Heatmap

A **beautiful and customizable contribution grid or heatmap** component for React Native apps — inspired by GitHub activity graphs.

---

## Installation

```bash
npm install react-native-contribution-grid-heatmap
```

# or

```bash
yarn add react-native-contribution-grid-heatmap
```

## Example 1

<image src="/assets/contribution-grid1.jpg" alt=""/>

## Usage/Examples

```javascript
import React from "react";
import { View } from "react-native";
import ContributionGrid from "react-native-contribution-grid-heatmap";

const contributionData = [
  { date: "2025-10-06", contributed: true, level: 1 },
  { date: "2025-10-10", contributed: true, level: 3 },
  { date: "2025-11-04", contributed: true, level: 5 },
];

export default function App() {
  return (
    <View>
      <ContributionGrid
        title="Contribution Grid Title"
        titleStyle={{ marginBottom: 10, fontWeight: "bold" }}
        showTitle={true}
        data={contributionData}
        showHeatmap={true}
      />
    </View>
  );
}
```

## Example 2

<image src="/assets/contribution-grid2.jpg" alt=""/>

## Usage/Examples

```javascript
import React from "react";
import { View } from "react-native";
import ContributionGrid from "react-native-contribution-grid-heatmap";

const contributionData = [
  { date: "2025-10-06", contributed: true },
  { date: "2025-10-10", contributed: true },
  { date: "2025-11-04", contributed: true },
];

export default function App() {
  return (
    <View>
      <ContributionGrid
        title="Contribution Grid Title"
        titleStyle={{ marginBottom: 10, fontWeight: "bold" }}
        showTitle={false}
        data={contributionData}
        showHeatmap={false}
      />
    </View>
  );
}
```

## Features

- Automatically aligns from Sunday → Saturday
- Highlights current date with border
- Auto-adjusts cell size based on screen width
- Fully themeable colors and padding
- Integrates smoothly with any React Native UI

## Props

| Prop                    | Type                                                             | Default   | Description                     |
| :---------------------- | :--------------------------------------------------------------- | :-------- | :------------------------------ |
| `title`                 | `String`                                                         | `title`   | Title of contribution grid      |
| `titleStyle`            | `Object`                                                         | `{}`      | Style object for title          |
| `showTitle`             | `Boolean`                                                        | `true`    | Show title                      |
| `data`                  | `Array<{date: string, contributed: boolean, level:number(1-5)}>` | `[]`      | Array of contribution data      |
| `activeColor`           | `string`                                                         | `#4CAF50` | Active cell color               |
| `inactiveColor`         | `string`                                                         | `#E0E0E0` | Inactive cell color             |
| `backgroundColor`       | `string`                                                         | `#F8F8F8` | Background color of grid        |
| `borderColor`           | `string`                                                         | `#4CAF50` | Border color for current date   |
| `containerPadding`      | `number`                                                         | `5`       | Padding around grid             |
| `containerMargin`       | `number`                                                         | `10`      | Margin around grid              |
| `cellSize`              | `number`                                                         | `20`      | Base size of each cell          |
| `gap`                   | `number`                                                         | `4`       | Gap between cells               |
| `columns`               | `number`                                                         | `16`      | Number of columns (weeks)       |
| `showDate`              | `Boolean`                                                        | `true`    | Show date inside grid cell      |
| `dateStyle`             | `Object`                                                         | `{}`      | Date style inside grid cell     |
| `showDayLabels`         | `Boolean`                                                        | `true`    | Show day labels on grid         |
| `showMonthLabels`       | `Boolean`                                                        | `true`    | Show month labels on grid       |
| `showHeatmap`           | `Boolean`                                                        | `true`    | Show heatmap                    |
| `showActionButton`      | `Boolean`                                                        | `true`    | Show action button              |
| `actionButtonTitle`     | `String`                                                         | `Action`  | Action title                    |
| `actionButtonStyle`     | `Object`                                                         | `{}`      | Action button style object      |
| `actionButtonTextStyle` | `Object`                                                         | `{}`      | Action button text style object |
| `onActionPress`         | `Function`                                                       | `()=>{}`  | Action button onPress funtion   |


## 🤝 Contributors

Thanks to these amazing people:

- **Harshal Dhawale** – Author  