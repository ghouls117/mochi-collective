type Props = {
  size?: number;
  className?: string;
};

export function MiniCluster({ size = 42, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-7 -20 114 114"
      aria-hidden="true"
      className={className}
      style={{ display: "block" }}
    >
      <circle cx="50" cy="10" r="18.6" fill="#F6BEC9" />
      <circle cx="78.53" cy="30.73" r="18.6" fill="#7ECADF" />
      <circle cx="67.63" cy="64.27" r="18.6" fill="#BFDEA3" />
      <circle cx="32.37" cy="64.27" r="18.6" fill="#F9C84A" />
      <circle cx="21.47" cy="30.73" r="18.6" fill="#93ADBF" />
    </svg>
  );
}
