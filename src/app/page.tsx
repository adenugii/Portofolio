"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// SVG Icon Props Interface
interface IconProps {
  size?: number;
  className?: string;
}

// Custom SVG Icons with enhanced styling
const ChevronDown: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const Code: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16,18 22,12 16,6"></polyline>
    <polyline points="8,6 2,12 8,18"></polyline>
  </svg>
);

const Layers: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12,2 2,7 12,12 22,7 12,2"></polygon>
    <polyline points="2,17 12,22 22,17"></polyline>
    <polyline points="2,12 12,17 22,12"></polyline>
  </svg>
);

const Zap: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
  </svg>
);

const Github: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Mail: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 0.9 2 2v12c0 1.1-0.9 2-2 2H4c-1.1 0-2-0.9-2-2V6c0-1.1 0.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const ExternalLink: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15,3 21,3 21,9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// Trail and Ripple Interfaces
interface Trail {
  x: number;
  y: number;
  timestamp: number;
  id: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

// Enhanced Cursor Component
const EnhancedCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  const trailsRef = useRef<Trail[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      trailsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        id: Math.random(),
      });
      
      if (trailsRef.current.length > 15) {
        trailsRef.current = trailsRef.current.slice(-15);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        id: Math.random(),
        timestamp: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  useEffect(() => {
    const updateTrails = () => {
      const now = Date.now();
      const validTrails = trailsRef.current.filter((trail) => now - trail.timestamp < 1000);
      setTrails(validTrails);
      
      setRipples((prev) => prev.filter((ripple) => now - ripple.timestamp < 1000));
      
      animationRef.current = requestAnimationFrame(updateTrails);
    };
    
    animationRef.current = requestAnimationFrame(updateTrails);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-200 ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 ${
            isHovering ? 'border-cyan-400 bg-cyan-400/20' : 'border-blue-400 bg-blue-400/10'
          } backdrop-blur-sm`}
        />
      </div>

      {/* Cursor trails */}
      {trails.map((trail, index) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - index * 0.05);
        const scale = Math.max(0.1, 1 - index * 0.1);
        
        return (
          <div
            key={trail.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: trail.x - 3,
              top: trail.y - 3,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
          </div>
        );
      })}

      {/* Click ripples */}
      {ripples.map((ripple) => {
        const age = Date.now() - ripple.timestamp;
        const scale = 1 + age / 200;
        const opacity = Math.max(0, 1 - age / 1000);
        
        return (
          <div
            key={ripple.id}
            className="fixed pointer-events-none z-30 rounded-full border-2 border-cyan-400"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
              transform: `scale(${scale})`,
              opacity: opacity * 0.6,
            }}
          />
        );
      })}
    </>
  );
};

// Particle Interface
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: 'blue' | 'cyan';
}

// Floating Particles Component
const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? 'blue' : 'cyan',
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
          y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full animate-pulse ${
            particle.color === 'blue' ? 'bg-blue-400/30' : 'bg-cyan-400/30'
          }`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color === 'blue' ? '#60a5fa' : '#22d3ee'}`,
          }}
        />
      ))}
    </div>
  );
};

// Geometric Background Component
const GeometricBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, #3b82f6, #06b6d4)',
          left: `${mousePos.x * 0.5}%`,
          top: `${mousePos.y * 0.3}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        className="absolute w-72 h-72 rounded-full blur-2xl opacity-15 transition-all duration-1500"
        style={{
          background: 'radial-gradient(circle, #8b5cf6, #ec4899)',
          right: `${(100 - mousePos.x) * 0.4}%`,
          top: `${mousePos.y * 0.6}%`,
          transform: 'translate(50%, -50%)',
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-10 transition-all duration-2000"
        style={{
          background: 'radial-gradient(circle, #06b6d4, #3b82f6)',
          left: `${mousePos.x * 0.3}%`,
          bottom: `${(100 - mousePos.y) * 0.4}%`,
          transform: 'translate(-50%, 50%)',
        }}
      />
      
      {/* Geometric shapes */}
      <div className="absolute top-20 left-20">
        <div 
          className="w-32 h-32 border border-blue-500/20 rotate-45 animate-spin-slow"
          style={{ animationDuration: '20s' }}
        />
      </div>
      <div className="absolute top-1/3 right-32">
        <div 
          className="w-24 h-24 border border-cyan-500/20 rotate-12 animate-pulse"
        />
      </div>
      <div className="absolute bottom-32 left-1/4">
        <div 
          className="w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-bounce"
          style={{ animationDuration: '3s' }}
        />
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
};

// Project and Skill Interfaces
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  year: string;
}

interface SkillItem {
  name: string;
  level: number;
  color: string;
}

interface SkillGroup {
  category: string;
  items: SkillItem[];
}

const Portfolio: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'skills', 'contact'];
      const scrollY = window.scrollY;
      
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setCurrentSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Revolution",
      subtitle: "Next-Gen Shopping Experience",
      description: "Modern e-commerce platform with advanced AI recommendations and seamless user experience",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tech: ["React", "Next.js", "TypeScript", "Tailwind", "Stripe"],
      category: "Full Stack",
      year: "2024",
    },
    {
      id: 2,
      title: "TaskFlow Pro",
      subtitle: "Collaborative Workspace",
      description: "Real-time collaborative task management with advanced analytics and team insights",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      tech: ["Vue.js", "Node.js", "Socket.io", "PostgreSQL"],
      category: "Web App",
      year: "2024",
    },
    {
      id: 3,
      title: "WeatherCast AI",
      subtitle: "Intelligent Weather Platform",
      description: "AI-powered weather prediction with beautiful data visualization and personalized insights",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      tech: ["React", "D3.js", "Python", "TensorFlow"],
      category: "Data Viz",
      year: "2023",
    },
  ];

  const skills: SkillGroup[] = [
    {
      category: "Frontend Masters",
      items: [
        { name: "React/Next.js", level: 95, color: "from-blue-500 to-cyan-500" },
        { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-400" },
        { name: "Vue.js/Nuxt", level: 88, color: "from-green-500 to-teal-500" },
        { name: "Tailwind CSS", level: 92, color: "from-cyan-500 to-blue-500" },
      ],
    },
    {
      category: "Backend & Tools",
      items: [
        { name: "Node.js/Express", level: 85, color: "from-green-600 to-green-400" },
        { name: "Python/FastAPI", level: 80, color: "from-yellow-500 to-orange-500" },
        { name: "PostgreSQL/MongoDB", level: 82, color: "from-purple-500 to-pink-500" },
        { name: "Docker/AWS", level: 78, color: "from-orange-500 to-red-500" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden cursor-none">
      {/* Enhanced Animations */}
      <EnhancedCursor />
      <FloatingParticles />
      <GeometricBackground />

      {/* Modern Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-full px-8 py-4 shadow-2xl">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AN
            </div>
            <div className="hidden md:flex space-x-6">
              {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    currentSection === item 
                      ? 'text-blue-400' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {currentSection === item && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative" ref={heroRef}>
        <div className={`text-center max-w-6xl mx-auto px-6 transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl mb-6">
              <Code className="text-blue-400" size={48} />
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              ADE
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NUGROHO
            </span>
          </h1>
          
          <div className="text-2xl md:text-3xl mb-8 text-slate-300 font-light">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              Frontend Developer
            </span>
            {" "}& Digital Craftsman
          </div>
          
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            I create exceptional digital experiences through clean code, innovative design, 
            and cutting-edge technology. Specializing in React, TypeScript, and modern web development.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollToSection('work')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              View My Work
              <ExternalLink className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-slate-700 rounded-full text-slate-300 font-semibold text-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm"
            >
              Get In Touch
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400 hover:text-blue-400 transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full text-blue-400 text-sm font-medium mb-6">
                  <Layers size={16} />
                  About Me
                </div>
                <h2 className="text-5xl font-bold mb-6">
                  Crafting Digital
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Excellence</span>
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed mb-6">
                  I'm a passionate frontend developer with 3+ years of experience creating 
                  stunning web applications. I believe in writing clean, maintainable code 
                  and creating user experiences that make a difference.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                  My expertise spans modern JavaScript frameworks, responsive design, 
                  and performance optimization. I'm constantly learning and adapting 
                  to new technologies to deliver cutting-edge solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-slate-400 text-sm">Projects</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">3+</div>
                  <div className="text-slate-400 text-sm">Years Exp</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="text-3xl font-bold text-purple-400 mb-2">20+</div>
                  <div className="text-slate-400 text-sm">Happy Clients</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face" 
                  alt="Profile"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-80 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Zap size={16} />
              Featured Work
            </div>
            <h2 className="text-5xl font-bold mb-6">
              Selected
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Projects</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A showcase of my best work, demonstrating technical expertise and creative problem-solving
            </p>
          </div>
          
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div key={project.id} className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="px-3 py-1 bg-slate-800 rounded-full">{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-4xl font-bold mb-2">{project.title}</h3>
                    <div className="text-xl text-blue-400 mb-4">{project.subtitle}</div>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg text-sm text-slate-300 border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105">
                      <ExternalLink size={18} />
                      Live Demo
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-all">
                      <Github size={18} />
                      Code
                    </button>
                  </div>
                </div>
                
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60 blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 blur-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Code size={16} />
              Technical Skills
            </div>
            <h2 className="text-5xl font-bold mb-6">
              Tech
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Stack</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A collection of technologies I specialize in, honed through years of hands-on experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {skills.map((skillGroup, groupIndex) => (
              <div key={groupIndex} className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-200 mb-8">{skillGroup.category}</h3>
                {skillGroup.items.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-200">{skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Mail size={16} />
            Get In Touch
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            Let's Build Something
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Amazing</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Ready to bring your ideas to life? I'm always excited to work on new projects 
            and collaborate with amazing people.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a 
              href="mailto:ade.nugroho@email.com"
              className="group p-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <Mail className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-slate-400">ade.nugroho@email.com</p>
            </a>
            
            <a 
              href="https://linkedin.com/in/ade-nugroho"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <Linkedin className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <p className="text-slate-400">Connect with me</p>
            </a>
            
            <a 
              href="https://github.com/ade-nugroho"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <Github className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-lg font-semibold mb-2">GitHub</h3>
              <p className="text-slate-400">Check my code</p>
            </a>
          </div>
          
          <button 
            onClick={() => window.location.href = 'mailto:ade.nugroho@email.com'}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            Start a Conversation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 mb-4 md:mb-0">
            © 2025 Ade Nugroho. Crafted with passion and code.
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/ade-nugroho" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/ade-nugroho" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:ade.nugroho@email.com"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;