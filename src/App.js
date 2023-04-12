import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Student from './Student';
import StudCreate from './StudCreate';
import StudEdit from './StudEdit';

function App() {
  return (
    <div className="App">
      <h1>Students Information</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Student />}></Route>
          <Route path='/students/create' element={<StudCreate />}></Route>
          <Route path='/students/edit/:id' element={<StudEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
