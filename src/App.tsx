import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import UserList from './User/UserList';
import UserCategory from './User/UserCategory';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user'>
                <Route index element={<UserList />} />
                <Route path='grid' element={<UserCategory />} />
            </Route>
            <Route path='/about' element={<About />} />
            <Route path='*' element={<p>Sorry page not found</p>} />
        </Routes>
    );
}

export default App;
