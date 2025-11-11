# 🟩 React Native Contribution Grid Heatmap

A **beautiful and customizable contribution grid or heatmap** component for React Native apps — inspired by GitHub activity graphs.  
Designed and maintained by **React Native Lab** 🧪.

---

## 🚀 Installation

[text](../../rnl-contribution-grid/rnl-contribution-grid/package.json)

```bash
npm install react-native-contribution-grid-heatmap
```

# or

```bash
yarn add react-native-contribution-grid-heatmap
```

## 🖼️ Preview

<image src="/assets/contribution-grid.jpg" alt=""/>

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
        data={contributionData}
        activeColor="#00C853"
        inactiveColor="#E0E0E0"
        borderColor="#00C853"
        backgroundColor="#F8F8F8"
        containerPadding={10}
        containerMargin={10}
        gap={4}
        columns={16}
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

| Prop               | Type                                          | Default   | Description                   |
| :----------------- | :-------------------------------------------- | :-------- | :---------------------------- |
| `title`            | `String`                                      | `title`   | Title of contribution grid    |
| `titleStyle`       | `Object`                                      | `{}`      | Style object for title        |
| `data`             | `Array<{date: string, contributed: boolean}>` | `[]`      | Array of contribution data    |
| `activeColor`      | `string`                                      | `#4CAF50` | Active cell color             |
| `inactiveColor`    | `string`                                      | `#E0E0E0` | Inactive cell color           |
| `backgroundColor`  | `string`                                      | `#F8F8F8` | Background color of grid      |
| `borderColor`      | `string`                                      | `#4CAF50` | Border color for current date |
| `containerPadding` | `number`                                      | `5`       | Padding around grid           |
| `containerMargin`  | `number`                                      | `10`      | Margin around grid            |
| `cellSize`         | `number`                                      | `20`      | Base size of each cell        |
| `gap`              | `number`                                      | `4`       | Gap between cells             |
| `columns`          | `number`                                      | `16`      | Number of columns (weeks)     |

## About React Native Lab

React Native Lab (RNL) is an initiative by Harshal Dhawale to create clean, modern, and open-source UI components for React Native developers.
