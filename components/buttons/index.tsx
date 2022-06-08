import type { buttonPrimary } from "types/components/buttons";
import styles from "styles/components/buttons.module.css";

export default function ButtonPrimary({
  children,
  colored,
  passProps,
  fullWidth,
  psuedo,
  whiteShadow,
}: buttonPrimary) {
  const className = `${styles.buttonPrimary} ${colored ? styles.colored : ""} ${
    fullWidth ? styles.fullWidth : ""
  } ${whiteShadow ? styles.whiteShadow : ""}`;
  if (psuedo)
    return (
      <span {...passProps} className={`${className} ${passProps?.className}`}>
        {children}
      </span>
    );
  return (
    <button {...passProps} className={`${className} ${passProps?.className}`}>
      {children}
    </button>
  );
}
