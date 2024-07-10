
import {useEffect} from 'react'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';

function App() {
  useEffect(() =>{
    console.log('init');
    
  }, [])
  return <RouterProvider router={router} />;
}
export default App;
