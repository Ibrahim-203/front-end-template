import { COLORS } from "../../constants/colors";

export default function StatusBadge({ status }) {
  const styles = {
    Active: {
      bg: COLORS.successLight,
      color: COLORS.success,
    },
    Inactive: {
      bg: "#f1f5f9",
      color: COLORS.textMuted,
    },
    Pending: {
      bg: COLORS.warningLight,
      color: COLORS.warning,
    },
  };

  const style = styles[status] || styles.Inactive;

  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.color,
      }}
      className="inline-block px-3 py-1 text-xs font-medium rounded-full"
    >
      {status}
    </span>
  );
}