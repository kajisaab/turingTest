import { Link } from 'react-router-dom';
import './HeaderSection.css';

function HeaderSection() {
    return (
        <nav className='navigation__wrapper'>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/user'>User</Link>
                </li>
                <li>
                    <Link to='/user/grid'>User Category</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    );
}

export default HeaderSection;
