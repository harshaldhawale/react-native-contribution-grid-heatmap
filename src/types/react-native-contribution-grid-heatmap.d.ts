declare module "react-native-contribution-grid-heatmap" {
  import * as React from "react";
  import { StyleProp, ViewStyle } from "react-native";

  export interface Contribution {
    date: string | Date;
    count: number;
  }

  export interface ContributionGridProps {
    values: Contribution[];
    endDate: string | Date;
    numDays: number;
    squareSize?: number;
    gutterSize?: number;
    chartColor?: string;
    backgroundColor?: string;
    onPress?: (value: Contribution) => void;
    style?: StyleProp<ViewStyle>;
  }

  export default class ContributionGrid extends React.Component<ContributionGridProps> {}
}
