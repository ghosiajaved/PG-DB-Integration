import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    /* <div className="App">
      <br/>
       <Form />
    </div> */

    <Router>
      <Routes>

      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Form isSignup />} />
        <Route path="/login" element={<Form />} />
        <Route path="/home" element={<PrivateRoute component={Home} />} />

      </Routes>
    </Router>

  );
}

export default App;
