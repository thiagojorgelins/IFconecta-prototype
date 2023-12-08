import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Alert {
  type: 'success' | 'danger' | 'warning' | 'info',
  title: string,
  icon: IconDefinition,
  message: string,
  timeout?: number,
}
