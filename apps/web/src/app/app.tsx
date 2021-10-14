import { useEffect } from 'react';

import { api, setTokenInterceptor } from '@charlycares/data-access';

setTokenInterceptor(async () => localStorage.getItem('token'));

export function App() {
  useEffect(() => {
    api.get('/pokemon/ditto').then(console.log).catch(console.log);
  }, []);

  return <div>Hello world</div>;
}

export default App;
