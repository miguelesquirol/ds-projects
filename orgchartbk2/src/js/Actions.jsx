import React, { useState } from 'react';

function Actions(props) {
  let index = 0;
  const { chart } = props;

  const [compactTtitle, setCompactTtitle] = useState(false);

  function CompactTtitleFun() {
    if (compactTtitle) {
      setCompactTtitle(false);
      chart.compact(false).render().fit();
    } else {
      setCompactTtitle(true);
      chart.compact(true).render().fit();
    }
  }

  return (
    <div>
      <button type="button" onClick={() => chart.fit()}>
        <i className="fas fa-sync" />
        fit
      </button>

      <button type="button" onClick={() => chart.fullscreen('body')}>
        <i className="fas fa-expand" />
        fullscreen
      </button>

      <button type="button" onClick={() => chart.expandAll().fit()}>
        <i className="fas fa-angle-double-down" />
        expand all
      </button>

      <button type="button" onClick={() => chart.collapseAll().fit()}>
        <i className="fas fa-angle-double-up" />
        collapse all
      </button>
      <button type="button" onClick={() => chart.zoomOut()}>
        <i className="fas fa-minus" />
        zoom out
      </button>
      <button type="button" onClick={() => chart.zoomIn()}>
        <i className="fas fa-plus" />
        zoom in
      </button>

      <button
        type="button"
        onClick={() => chart
          .layout(['right', 'bottom', 'left', 'top'][index++ % 4])
          .render()
          .fit()}
        className="btn btn-action-button waves-effect waves-light"
      >
        <i className="fas fa-retweet" />
        rotate
      </button>

      <button
        type="button"
        onClick={() => CompactTtitleFun()}
      >
        <i className="fas fa-sitemap" />
        {compactTtitle ? 'expand' : 'compact'}
      </button>
    </div>
  );
}

export default Actions;
