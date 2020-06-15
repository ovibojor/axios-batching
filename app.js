import client from "./apiClient.js";

function runTest() {
  const batchUrl = '/file-batch-api';
  // Should batch in to one request
  client().get(batchUrl, { params: { ids: [ 'fileid1', 'fileid2' ] } });
  client().get(batchUrl, { params: { ids: [ 'fileid2' ] } });

  // More tests;
  client().get(batchUrl, { params: { ids: [ 'fileid4', 'fileid5', 'fileid6' ] } });
  client().get(batchUrl, { params: { ids: [ 'fileid5' ] } });
  client().get(batchUrl, { params: { ids: [ 'fileid4', 'fileid5' ] } });
  client().get(batchUrl, { params: { ids: [ 'fileid2' ] } });

  // The following should reject as the fileid3 is missing from the response
  client().get(batchUrl, { params: { ids: [ 'fileid3' ] } });
}

runTest();
