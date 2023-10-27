/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from 'd3-org-chart';
import ReactDOMServer from 'react-dom/server';
import * as _ from 'lodash';

import resData from '../json/dataTest.json';
import Button from './Button';
import Card from './Card';
import Actions from './Actions';
import Search from './Search';
// eslint-disable-next-line import/prefer-default-export
export function OrgChartComponent() {
  const d3Container = useRef(null);

  const [chart] = useState(new OrgChart());

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

        .layout('top')
        .data([
          ..._.map(resData, (area) => ({
            ...area,
            parentId: area.ParentAreaId ? area.ParentAreaId : 'root',
          })),
          {
            id: 'root',
            parentId: null,
            name: 'Digital Silk',
            positionName: '',
            tag: 'main',
          },
        ])

        .childrenMargin(() => 60)
        .siblingsMargin(() => 100)
        .nodeWidth((d) => {
          if (d.depth === 0) return 500;
          return 250;
        })
        .nodeHeight(() => 100)
        .nodeHeight(() => 135)
        .compactMarginBetween(() => 65)
        .compactMarginPair(() => 100)

        .buttonContent(({ node }) => ReactDOMServer.renderToStaticMarkup(<Button node={node} />))
        .nodeContent((d) => ReactDOMServer.renderToStaticMarkup(<Card d={d} />))

        .render()
        .compact(false);
    }
  }, [chart]);
  return (
    <div>
      <div ref={d3Container} onClick={onNodeClick} onKeyDown={onNodeClick} />
      <div className="action">
        <Actions chart={chart} />
        <Search data={resData} chart={chart} />
      </div>
    </div>
  );
}
