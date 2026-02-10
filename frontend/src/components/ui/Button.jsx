import { colors } from "../../style/theme";

const variants = {
  primary: {
    background: colors.primary,
    color: colors.primaryText,
  },
  secondary: {
    background: colors.secondary,
    color: colors.secondaryText,
  },
  danger: {
    background: colors.danger,
    color: colors.dangerText,
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  style,
  ...props
}) {
  return (
    <button
      {...props}
      style={{
        padding: size === "sm" ? "6px 10px" : "8px 14px",
        borderRadius: "6px",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
