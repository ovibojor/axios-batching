import axios from 'axios';

const batched = {};
const CancelToken = axios.CancelToken
const useBatching = (request, cancel) => {
  const { url, params: { ids } } = request;

  // Concat saved fileIds with the new request fileIds and cancel the request;
  if (url in batched) {
    batched[ url ] = [ ...new Set(batched[ url ].concat(ids)) ];

    cancel();
  } else {
    batched[ url ] = ids; // store the initial url with initial ids
  }
}

function batchInterceptor(instance) {
  instance.interceptors.request.use(request => {
    const { url } = request;

    request.cancelToken = new CancelToken((c) => {
      useBatching(request, c);
    });

    return new Promise(resolve => {
      // We queue this because we want to handle all the requests before returning
      setTimeout(() => {
        request.params.ids = batched[ url ];

        resolve(request);
      }, 0);
    })
  }, error => Promise.reject);
}


export default batchInterceptor;
