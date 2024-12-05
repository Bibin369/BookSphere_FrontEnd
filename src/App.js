import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import Add from './components/Add';
import ViewAll from './components/ViewAll';

function App() {
  return (

    <BrowserRouter>
    <Routes>
    <Route path='' element={<Index/>}/>
    <Route path='add' element={<Add/>}/>
    <Route path='viewAll' element={<ViewAll/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
