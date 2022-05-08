import React, { useState } from 'react';
import ObjectViewer from '../ObjectViewer/ObjectViewer';

function ObjectLoader() {
  const [mtlPath, setMtlPath] = useState('');
  const [objPath, setObjPath] = useState('');

  const [mtlFile, setMtlFile] = useState<File>(new File([], ''));
  const [objFile, setObjFile] = useState<File>(new File([], ''));

  const [loading, setLoading] = useState(false);

  async function handleMtlFile(event: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const { files, value } = event.target;
    setMtlPath(value);
    if (files === null || files.length === 0) return;
    setMtlFile(files[0]);
    setLoading(false);
  }
  async function handleObjFile(event: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const { files, value } = event.target;
    setObjPath(value);
    if (files === null || files.length === 0) return;
    setObjFile(files[0]);
    setLoading(false);
  }
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div>
        <label>OBJ File</label>
        <input type="file" onChange={handleObjFile} />
      </div>
      <div>
        <label>MTL File</label>
        <input type="file" onChange={handleMtlFile} />
      </div>
      <ObjectViewer mtlPath={mtlPath} objPath={objPath} />
    </div>
  );
}

export default ObjectLoader;
