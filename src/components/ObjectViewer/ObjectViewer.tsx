import React, { useEffect } from 'react';
import LoadObj from '../util/ObjectLoader';
function ObjectViewer({
  mtlPath,
  objPath,
}: {
  mtlPath: string;
  objPath: string;
}) {
  const CANVAS_ID = 'canvas-id';
  useEffect(() => {
    LoadObj({ mtlPath, objPath, canvasId: CANVAS_ID });
  }, [mtlPath, objPath]);
  return <div id={CANVAS_ID} />;
}

export default ObjectViewer;
