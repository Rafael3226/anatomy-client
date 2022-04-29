import React, { useState } from 'react';

function ObjectLoader() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [arrayBuffers, setArrayBuffer] = useState<ArrayBuffer[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const { files } = event.target;
    if (files !== null) {
      for (let file of files) {
        const arrayBuffer = await file.arrayBuffer();
        setFileNames((names) => {
          setArrayBuffer((buffers) => {
            if (!names.includes(file.name)) {
              buffers.push(arrayBuffer);
              names.push(file.name);
            }
            return buffers;
          });
          return names;
        });
      }
    }
    setLoading(false);
  }
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <input type="file" onChange={handleFiles} multiple />
      {Array.from(fileNames).map((name, key) => (
        <div key={key}>{name}</div>
      ))}
      {arrayBuffers.map((buffer, key) => (
        <div key={key}>{buffer.byteLength}</div>
      ))}
      <div id="obj"></div>
    </div>
  );
}

export default ObjectLoader;
