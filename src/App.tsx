
import './App.css';
import Home from './Pages/Home';
function App() {
  console.log('meta.env.VITE_API_URL',import.meta.env.VITE_API_URL); 
  return <Home></Home>;
}

export default App;
