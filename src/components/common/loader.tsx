import React from "react";
import "@/styles/loader.css"; // Optional: Add your custom styles

const Loader = ({
  size = "50px",
  color = "#000",
  text = "",
  textColor = "#000",
  borderWidth = "4px",
}) => {
  const loaderStyle = {
    width: size,
    height: size,
    border: `${borderWidth} solid ${color}`,
    borderTop: `${borderWidth} solid transparent`,
  };

  const textStyle = {
    color: textColor,
    marginTop: "10px",
    fontSize: "16px",
  };

  return (
    <div className="loader-container" style={{ textAlign: "center" }}>
      <div className="loader" style={loaderStyle}></div>
      {text && <div style={textStyle}>{text}</div>}
    </div>
  );
};

export default Loader;
