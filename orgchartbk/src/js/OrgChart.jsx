import React, { useLayoutEffect, useRef, useState } from "react";
import { OrgChart } from "d3-org-chart";
import ReactDOMServer from "react-dom/server";
import * as _ from "lodash";

import resData from "../json/dataTest.json";
import Button from "./Button";
import Card from "./Card";
import Actions from "./Actions";
import Search from "./Search";

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);

  let [chart] = useState(new OrgChart());

  function onNodeClick() {}

  useLayoutEffect(() => {
    if (resData && d3Container.current) {
      chart
        .container(d3Container.current)
        .onNodeClick((d) => {
          chart.clearHighlighting();
          chart
            .initialZoom(1)
            .setCentered(d)
            .render();
        })
        .initialZoom(1)
        .layout("top")
        .data([
          ..._.map(resData, (area) => ({
            ...area,
            parentId: area.ParentAreaId ? area.ParentAreaId : "root",
          })),
          {
            id: "root",
            parentId: null,
            name: "Digital Silk",
            positionName: "",
            tag: "main",
          },
        ])
        .childrenMargin((node) => 60)
        .siblingsMargin((d) => 100)
        .nodeWidth((d) => {
          if (d.depth === 0) return 500;
          return 250;
        })
        .nodeHeight((d) => 100)
        .nodeHeight((d) => 135)
        .compactMarginBetween((d) => 65)
        .compactMarginPair((d) => 100)
        .buttonContent(({ node, state }) => {
          return ReactDOMServer.renderToStaticMarkup(<Button node={node} />);
        })

        .nodeContent(function (d, i, arr, state) {
          return ReactDOMServer.renderToStaticMarkup(<Card d={d} />);
        })
        .render();
    }
  }, [chart]);
  return (
    <div>
      <div ref={d3Container} onNodeClick={onNodeClick} />
      <div className="action">
        <Actions chart={chart} />
        <Search data={resData} chart={chart} />
      </div>
    </div>
  );
};
