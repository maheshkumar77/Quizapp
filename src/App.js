import './App.css';
import Footer from './component/Foter';
import Navbar from './component/Navbar';
import Quizcomp from './component/Quizcomp';
import ShowHistory from './component/ShowHistory';
import {  Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={<Quizcomp />} />
          <Route path="/history" element={<ShowHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
