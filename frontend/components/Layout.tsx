import Svg, { Circle, Path, Rect } from "react-native-svg";

import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";

const Layout = ({
  type = "rows",
  highlight = [],
  inactive = [
    [0, 0],
    [0, 4],
    [2, 3],
  ],
  onTouch,
}) => {
  const rows = 5;
  const columns = 4;
  const shape = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => Math.floor(Math.random() * 10))
  );

  const fillColor = (index: number, rowIndex: number) => {
    if (
      inactive.find((banned) => banned[0] === index && banned[1] === rowIndex)
    )
      return "grey";
    if (highlight[0] === index && highlight[1] === rowIndex) return "red";
    if (highlight[0] === index && highlight[1] === rowIndex) return "red";
    return "white";
  };

  return type === "rows" ? (
    <View style={[{ alignItems: "center", justifyContent: "center" }]}>
      <Svg
        height={rows * 40 + 10}
        width={columns * 40 + 30}
        style={{ backgroundColor: "#dbdbd9" }}
      >
        {shape.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((_, index) => (
              <Rect
                key={`${index * 40 + 20}:${rowIndex * 40 + 10}`}
                x={index * 40 + 20}
                y={rowIndex * 40 + 10}
                width="30"
                height="30"
                strokeWidth="2"
                stroke="black"
                fill={fillColor(index, rowIndex)}
                onPointerDown={() => onTouch(index, rowIndex)}
              />
            ))}
          </Fragment>
        ))}
      </Svg>
    </View>
  ) : (
    <View style={[{ alignItems: "center", justifyContent: "center" }]}>
      <Svg
        height={rows * 40 + 10}
        width={columns * 40 + 30}
        style={{ backgroundColor: "grey" }}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <Fragment key={`horizontal-${index}`}>
            <Rect
              x={index * 40 + 60}
              y={10}
              width="30"
              height="30"
              strokeWidth="2"
              stroke="black"
              fill="white"
            />
            <Rect
              x={index * 40 + 60}
              y={170}
              width="30"
              height="30"
              strokeWidth="2"
              stroke="black"
              fill="white"
            />
          </Fragment>
        ))}
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={`vertical-${index}`}>
            <Rect
              x={20}
              y={index * 40 + 50}
              width="30"
              height="30"
              strokeWidth="2"
              stroke="black"
              fill="white"
            />
            <Rect
              x={140}
              y={index * 40 + 50}
              width="30"
              height="30"
              strokeWidth="2"
              stroke="black"
              fill="white"
            />
          </Fragment>
        ))}
      </Svg>
    </View>
  );
};

export default Layout;
