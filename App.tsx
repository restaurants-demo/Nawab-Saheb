
import React, { useState, useEffect } from 'react';
import { MENU_DATA, ROOMS_DATA, TESTIMONIALS, BLOG_POSTS, GALLERY_IMAGES } from './constants';
import { MenuCategory, Room, BlogPost } from './types';
import AIConcierge from './components/AIConcierge';

type Page = 'home' | 'about' | 'services' | 'menu' | 'gallery' | 'blog' | 'contact';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeMenuTab, setActiveMenuTab] = useState<MenuCategory>('starters');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [formStatus, setFormStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('SUBMITTING');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/xlgwnrab', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus('SUCCESS');
        form.reset();
        setTimeout(() => setFormStatus('IDLE'), 5000);
      } else {
        setFormStatus('ERROR');
        setTimeout(() => setFormStatus('IDLE'), 5000);
      }
    } catch (error) {
      setFormStatus('ERROR');
      setTimeout(() => setFormStatus('IDLE'), 5000);
    }
  };

  // --- Sub-components (Pages) ---

  const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="relative pt-40 pb-20 bg-charcoal border-b border-cream/5 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80" alt="bg" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <h1 className="font-display text-5xl md:text-7xl text-gold mb-4 animate-slide-up uppercase tracking-tighter">{title}</h1>
        {subtitle && <p className="text-cream/50 uppercase tracking-[0.3em] text-sm animate-fade-in">{subtitle}</p>}
      </div>
    </div>
  );

  const Home = () => (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80" alt="Nawab Saheb" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                <span className="text-gold-light text-xs tracking-widest uppercase">Specialty Mughlai in Mumbai</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-cream font-medium tracking-tight leading-tight mb-6">
                Experience Royal<br />
                <span className="text-gold">Mughlai Heritage</span>
              </h1>
              <p className="text-cream/70 text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                Step into the world of Nizams and Nawabs at Nawab Saheb. Located at The Westin Mumbai Powai Lake, we offer a regal journey of authentic flavors.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={() => navigateTo('contact')} className="group inline-flex items-center px-8 py-4 bg-gold text-charcoal font-medium rounded-lg hover:bg-gold-light transition-all duration-300 uppercase tracking-widest text-sm">
                  <span className="iconify w-5 h-5 mr-2" data-icon="lucide:calendar"></span>
                  Reserve Table
                </button>
                <button onClick={() => navigateTo('menu')} className="inline-flex items-center px-8 py-4 border border-cream/30 text-cream font-medium rounded-lg hover:border-gold hover:text-gold transition-all duration-300 uppercase tracking-widest text-sm">
                  View Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const About = () => (
    <div className="animate-fade-in">
      <PageHeader title="Our Heritage" subtitle="Legacy of Awadh" />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80" alt="Heritage" className="rounded-2xl shadow-2xl z-10 relative" />
            <div className="absolute -bottom-8 -right-8 bg-gold p-8 rounded-2xl shadow-xl z-20">
              <span className="block font-display text-4xl text-charcoal">Est. 2008</span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-cream mb-8 leading-tight">Authentic Flavors, <span className="text-gold">Royal Ambiance</span></h2>
            <p className="text-cream/70 mb-6 leading-relaxed">Nawab Saheb is more than a restaurant; it's a testament to the grand culinary traditions of North India. Nestled within the luxury of The Westin Mumbai Powai Lake, we offer a tranquil dining space overlooking the serene waters.</p>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="border-l-2 border-gold pl-6">
                <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-2">Our Mission</h4>
                <p className="text-cream/50 text-sm">To preserve and serve the lost recipes of the royal kitchens of India.</p>
              </div>
              <div className="border-l-2 border-gold pl-6">
                <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-2">Our Quality</h4>
                <p className="text-cream/50 text-sm">Hand-picked spices and slow-cooking techniques passed down through generations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const Services = () => (
    <div className="animate-fade-in">
      <PageHeader title="Our Services" subtitle="Bespoke Hospitality" />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'All You Can Eat', icon: 'lucide:utensils-crosses', desc: 'Indulge in our unlimited Mughlai feast with live counters and tableside service.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
            { title: 'Happy Hour Food', icon: 'lucide:clapperboard', desc: 'Specially curated bites and refreshment pairings during our golden sunset hours.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80' },
            { title: 'Vegetarian Options', icon: 'lucide:leaf', desc: 'A vast dedicated menu of regal vegetarian delights crafted with the same royal spices.', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80' }
          ].map((s, idx) => (
            <div key={idx} className="group bg-charcoal-light rounded-2xl overflow-hidden border border-cream/5 hover:border-gold/30 transition-all flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-1">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="iconify w-6 h-6 text-gold" data-icon={s.icon}></span>
                </div>
                <h3 className="text-cream font-display text-2xl mb-4">{s.title}</h3>
                <p className="text-cream/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const Menu = () => (
    <div className="animate-fade-in">
      <PageHeader title="The Menu" subtitle="Awadhi Masterpieces" />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {(['starters', 'mains', 'desserts', 'beverages'] as MenuCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveMenuTab(cat)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 uppercase tracking-widest text-xs ${activeMenuTab === cat ? 'bg-gold text-charcoal' : 'bg-charcoal border border-cream/10 text-cream/70 hover:border-gold hover:text-gold'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_DATA[activeMenuTab].map((item, idx) => (
            <div key={idx} className="group bg-charcoal rounded-2xl overflow-hidden border border-cream/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-charcoal/80 text-gold text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md border border-gold/20">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl text-cream">{item.name}</h3>
                  <span className="text-gold font-display text-lg">{item.price}</span>
                </div>
                <p className="text-cream/50 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const Gallery = () => (
    <div className="animate-fade-in">
      <PageHeader title="Visual Gallery" subtitle="Moments of Elegance" />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className="relative group overflow-hidden rounded-xl cursor-pointer aspect-[4/5]"
              onClick={() => setLightboxIndex(idx)}
            >
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="iconify w-10 h-10 text-gold" data-icon="lucide:maximize"></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const Blog = () => (
    <div className="animate-fade-in">
      <PageHeader title="Regal Insights" subtitle="Culinary Stories" />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedBlog(post)}
            >
              <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-8">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-gold text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
                <span className="w-1 h-1 bg-cream/20 rounded-full"></span>
                <span className="text-cream/30 text-[10px] uppercase font-bold">{post.date}</span>
              </div>
              <h3 className="font-display text-3xl text-cream mb-4 group-hover:text-gold transition-colors">{post.title}</h3>
              <p className="text-cream/50 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
              <span className="text-gold text-xs uppercase tracking-widest font-bold inline-flex items-center">
                Read Story <span className="iconify ml-2" data-icon="lucide:arrow-right"></span>
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );

  const Contact = () => (
    <div className="animate-fade-in">
      <PageHeader title="Contact Us" subtitle="Royal Invitations" />
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-4xl text-cream mb-8">Find Your Table</h2>
              <div className="space-y-8">
                 <div className="flex items-start space-x-6">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 text-gold">
                      <span className="iconify w-7 h-7" data-icon="lucide:map-pin"></span>
                    </div>
                    <div>
                      <h4 className="text-cream font-display text-xl mb-1">Our Address</h4>
                      <p className="text-cream/50 text-sm leading-relaxed">The Westin, 2 & 3B, Lake, near Chinmayanand Ashram,<br />Kailash Nagar, Mayur Nagar, Morarji Nagar,<br />Powai, Mumbai, Maharashtra 400087</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-6">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 text-gold">
                      <span className="iconify w-7 h-7" data-icon="lucide:phone-call"></span>
                    </div>
                    <div>
                      <h4 className="text-cream font-display text-xl mb-1">Direct Contact</h4>
                      <p className="text-cream/50 text-sm">099206 23203</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
          <div className="bg-charcoal-light p-10 rounded-2xl border border-cream/5">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-cream/70 text-xs font-bold uppercase tracking-widest mb-3">Name</label>
                  <input name="name" required className="w-full bg-charcoal border border-cream/10 rounded-lg px-5 py-4 text-cream focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-cream/70 text-xs font-bold uppercase tracking-widest mb-3">Email</label>
                  <input name="email" type="email" required className="w-full bg-charcoal border border-cream/10 rounded-lg px-5 py-4 text-cream focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-cream/70 text-xs font-bold uppercase tracking-widest mb-3">Date</label>
                  <input name="date" type="date" required className="w-full bg-charcoal border border-cream/10 rounded-lg px-5 py-4 text-cream focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-cream/70 text-xs font-bold uppercase tracking-widest mb-3">Guests</label>
                  <select name="guests" className="w-full bg-charcoal border border-cream/10 rounded-lg px-5 py-4 text-cream focus:outline-none focus:border-gold transition-colors">
                    {[1,2,3,4,5,6,8,10,12,15].map(n => <option key={n} value={n}>{n} Guests</option>)}
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={formStatus === 'SUBMITTING'}
                className={`w-full py-5 font-bold rounded-lg transition-all shadow-xl shadow-gold/10 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm ${
                  formStatus === 'SUBMITTING' ? 'bg-gold-light text-charcoal cursor-not-allowed' : 
                  formStatus === 'SUCCESS' ? 'bg-green-600 text-cream' :
                  formStatus === 'ERROR' ? 'bg-red-600 text-cream' :
                  'bg-gold text-charcoal hover:bg-gold-light'
                }`}
              >
                {formStatus === 'SUBMITTING' && <span className="iconify animate-spin" data-icon="lucide:loader-2"></span>}
                <span>
                  {formStatus === 'IDLE' && 'Confirm Booking'}
                  {formStatus === 'SUBMITTING' && 'Processing...'}
                  {formStatus === 'SUCCESS' && 'Booking Confirmed!'}
                  {formStatus === 'ERROR' && 'Try Again'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-charcoal selection:bg-gold/30">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'bg-charcoal/95 backdrop-blur-lg border-b border-cream/5 shadow-xl' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <button onClick={() => navigateTo('home')} className="flex items-center space-x-3 group text-left">
              <div className="w-10 h-10 lg:w-12 lg:h-12 border border-gold rounded-full flex items-center justify-center group-hover:border-gold-light transition-colors">
                <span className="font-display text-gold text-lg lg:text-xl font-medium tracking-tighter">NS</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-cream text-lg lg:text-xl tracking-tight uppercase">Nawab Saheb</span>
                <span className="block text-gold-light text-[10px] tracking-[0.2em] uppercase">The Westin Mumbai</span>
              </div>
            </button>
            <div className="hidden lg:flex items-center space-x-1">
              {(['home', 'about', 'services', 'menu', 'gallery', 'blog', 'contact'] as Page[]).map((page) => (
                <button 
                  key={page} 
                  onClick={() => navigateTo(page)}
                  className={`px-4 py-2 text-sm transition-colors relative group uppercase tracking-widest font-bold text-[10px] ${currentPage === page ? 'text-gold' : 'text-cream/80 hover:text-gold'}`}
                >
                  {page}
                  <span className={`absolute bottom-0 left-1/2 h-px bg-gold transition-all duration-300 ${currentPage === page ? 'w-full left-0' : 'w-0 group-hover:w-full group-hover:left-0'}`}></span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigateTo('contact')} className="hidden sm:inline-flex items-center px-5 py-2.5 bg-gold text-charcoal text-[10px] uppercase tracking-widest font-bold rounded hover:bg-gold-light transition-all duration-300">
                Reserve Table
              </button>
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-cream p-2">
                <span className="iconify w-8 h-8" data-icon="lucide:menu"></span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/98 backdrop-blur-xl animate-fade-in lg:hidden">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <span className="font-display text-cream text-xl uppercase tracking-widest">Nawab Saheb</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-cream">
                <span className="iconify w-8 h-8" data-icon="lucide:x"></span>
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-6 flex-1 justify-center">
              {(['home', 'about', 'services', 'menu', 'gallery', 'blog', 'contact'] as Page[]).map((page) => (
                <button key={page} onClick={() => navigateTo(page)} className={`text-3xl font-display uppercase tracking-widest ${currentPage === page ? 'text-gold' : 'text-cream hover:text-gold'}`}>
                  {page}
                </button>
              ))}
            </nav>
            <button onClick={() => navigateTo('contact')} className="w-full py-4 bg-gold text-charcoal text-center font-bold uppercase tracking-widest rounded-lg">
              Reserve Table
            </button>
          </div>
        </div>
      )}

      <main className="min-h-screen">
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About />}
        {currentPage === 'services' && <Services />}
        {currentPage === 'menu' && <Menu />}
        {currentPage === 'gallery' && <Gallery />}
        {currentPage === 'blog' && <Blog />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-cream/5 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-display text-gold text-4xl mb-6">NS</div>
          <p className="text-cream/40 text-sm mb-12 max-w-lg mx-auto leading-relaxed uppercase tracking-widest">Nawab Saheb — The Westin Mumbai Powai Lake</p>
          <div className="flex justify-center space-x-8 mb-12">
            {['Instagram', 'Facebook', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="text-cream/30 hover:text-gold transition-colors uppercase tracking-[0.3em] text-[10px] font-bold">{s}</a>
            ))}
          </div>
          <p className="text-[10px] text-cream/20 uppercase tracking-widest font-bold">© 2025 Nawab Saheb Mumbai. All rights reserved.</p>
        </div>
      </footer>

      {/* AI Concierge */}
      <AIConcierge />

      {/* Modals */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal animate-fade-in p-4 md:p-12">
           <div className="max-w-4xl mx-auto bg-charcoal-light rounded-3xl overflow-hidden border border-cream/5 relative shadow-2xl">
              <button onClick={() => setSelectedBlog(null)} className="fixed top-8 right-8 bg-charcoal-light w-12 h-12 rounded-full flex items-center justify-center text-cream hover:text-gold transition-all z-20 shadow-xl border border-gold/20">
                <span className="iconify w-6 h-6" data-icon="lucide:x"></span>
              </button>
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-96 object-cover" />
              <div className="p-10 md:p-16">
                 <div className="flex items-center space-x-4 mb-8">
                    <span className="px-4 py-1.5 bg-gold text-charcoal font-bold uppercase text-[10px] tracking-widest rounded-full">{selectedBlog.category}</span>
                    <span className="text-cream/30 text-xs font-bold uppercase tracking-widest">{selectedBlog.date}</span>
                 </div>
                 <h2 className="font-display text-4xl md:text-5xl text-cream mb-8 leading-tight">{selectedBlog.title}</h2>
                 <div className="prose prose-invert max-w-none">
                    {selectedBlog.content.split('\n\n').map((p, i) => (
                      <p key={i} className="text-cream/70 text-lg leading-relaxed mb-6">{p}</p>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-charcoal/98 flex items-center justify-center p-4">
           <button onClick={() => setLightboxIndex(null)} className="absolute top-8 right-8 text-cream/50 hover:text-gold transition-colors">
              <span className="iconify w-10 h-10" data-icon="lucide:x"></span>
           </button>
           <div className="max-w-6xl w-full flex items-center justify-between">
              <button onClick={() => setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)} className="text-cream/50 hover:text-gold">
                <span className="iconify w-12 h-12" data-icon="lucide:chevron-left"></span>
              </button>
              <img src={GALLERY_IMAGES[lightboxIndex]} className="max-h-[80vh] max-w-full rounded-2xl shadow-2xl border border-gold/20" />
              <button onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)} className="text-cream/50 hover:text-gold">
                <span className="iconify w-12 h-12" data-icon="lucide:chevron-right"></span>
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
