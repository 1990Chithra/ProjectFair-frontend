import './App.css';
// import Header from './Components/Header';
import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/Project' element={<Project/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>      
    </div>
  );
}

export default App;
