import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BestSchoolMuzaffarpur from './pages/seo/BestSchoolMuzaffarpur';
import CBSESchoolMuzaffarpur from './pages/seo/CBSESchoolMuzaffarpur';
import EnglishMediumSchool from './pages/seo/EnglishMediumSchool';
import AdmissionsOpen from './pages/seo/AdmissionsOpen';
import SchoolNearMe from './pages/seo/SchoolNearMe';
import AdminLogin from './pages/AdminLogin';

const AuthenticatedApp = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-cobalt-deep">
        <div className="flex flex-col items-center gap-5">
          <img
            src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
            alt="DIS"
            className="h-12 w-auto opacity-70"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <div className="w-5 h-5 border-2 border-amber/20 border-t-amber rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/admissions" element={<Admissions />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/best-school-in-muzaffarpur" element={<BestSchoolMuzaffarpur />} />
      <Route path="/cbse-school-in-muzaffarpur" element={<CBSESchoolMuzaffarpur />} />
      <Route path="/english-medium-school-in-muzaffarpur" element={<EnglishMediumSchool />} />
      <Route path="/admissions-open" element={<AdmissionsOpen />} />
      <Route path="/school-near-me" element={<SchoolNearMe />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;