import { TextStyle, ViewStyle } from "react-native";

// ----------------- Types -----------------
export interface ContributionItem {
  date: string | Date;
  contributed: boolean;
  level?: number;
}

export interface ContributionGridProps {
  title?: string;
  titleStyle?: TextStyle;
  showTitle?: boolean;
  data?: ContributionItem[];
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  containerPadding?: number;
  containerMargin?: number;
  cellSize?: number;
  gap?: number;
  columns?: number;
  showDate?: boolean;
  dateStyle?: TextStyle;
  showMonthLabels?: boolean;
  showDayLabels?: boolean;
  showHeatmap?: boolean;

  // Action Button Props
  showActionButton?: boolean;
  actionButtonTitle?: string;
  actionButtonStyle?: ViewStyle;
  actionButtonTextStyle?: TextStyle;
  onActionPress?: () => void;
}
