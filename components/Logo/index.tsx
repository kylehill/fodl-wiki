import React from "react";

type Props = {
  size?: number;
};

const Logo = ({ size = 64 }: Props) => {
  return (
    <img
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "top",
      }}
      height={size}
      width={size}
      src="/fodl-logo.png"
    />
  );
};

export default Logo;
