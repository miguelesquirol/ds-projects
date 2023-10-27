import React from 'react';

const Actions = (props) => {
  let index = 0;
  let compact = 0;

  return (
    <div>
      <button onClick={() => props.chart.fit()}>
        <i className="fas fa-sync"></i> fit
      </button>

      <button onClick={() => props.chart.fullscreen("body")}>
        <i className="fas fa-expand"></i> fullscreen
      </button>

      <button onClick={() => props.chart.expandAll().fit()}>
        <i className="fas fa-angle-double-down"></i> expand all
      </button>

      <button onClick={() => props.chart.collapseAll().fit()}>
        <i className="fas fa-angle-double-up"></i> collapse all
      </button>
      <button onClick={() => props.chart.zoomOut()}>
        <i className="fas fa-minus"></i> zoom out
      </button>
      <button onClick={() => props.chart.zoomIn()}>
        <i className="fas fa-plus"></i> zoom in
      </button>

      <button
        onClick={() =>
          props.chart
            .layout(["right", "bottom", "left", "top"][index++ % 4])
            .render()
            .fit()
        }
        className="btn btn-action-button waves-effect waves-light"
      >
        <i className="fas fa-retweet"></i> rotate
      </button>

      <button
        onClick={() =>
          props.chart
            .compact(!!(compact++ % 2))
            .render()
            .fit()
        }
      >
        <i className="fas fa-sitemap"></i> compact
      </button>
    </div>
  );
};

export default Actions;
