import Home from '../pages/Home';
import Gold from '../pages/Gold';
import Profile from '../pages/Profile';
import Art from '../pages/Art';
import DynamicArt from '../pages/DynamicArt';
import Certificates from '../pages/Certificates';
import DynamicCertificates from '../pages/DynamicCertificates';
import NotFoundPage from '../pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/gold' element={<Gold />} />
            <Route path='/art' element={<Art />} />
            <Route path='/art/:id' element={<DynamicArt />} />
            <Route path='/certificates' element={<Certificates />} />
            <Route path='/certificates/:id' element={<DynamicCertificates />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
} 