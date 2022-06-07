import type { buttonPrimary } from "types/components/buttons";
import styles from "styles/components/buttons.module.css";

export default function ButtonPrimary({
  children,
  colored,
  passProps,
  fullWidth,
  psuedo,
}: buttonPrimary) {
  const className = `${styles.buttonPrimary} ${colored ? styles.colored : ""} ${
    fullWidth ? styles.fullWidth : ""
  }`;
  if (psuedo)
    return (
      <span className={className} {...passProps}>
        {children}
      </span>
    );
  return (
    <button className={className} {...passProps}>
      {children}
    </button>
  );
}
