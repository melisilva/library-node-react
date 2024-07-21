import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Books } from './pages/Books';
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
