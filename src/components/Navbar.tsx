// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Container, Navbar as BsNavbar, Nav, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // ป้องกัน Error Hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <BsNavbar expand="lg" className="shadow-sm" style={{ backgroundColor: theme === 'dark' ? '#1a1e21' : '#ffffff' }} variant={theme}>
      <Container>
        <Link href="/" passHref legacyBehavior>
          <BsNavbar.Brand className="fw-bold text-primary">
            💙 Donation System
          </BsNavbar.Brand>
        </Link>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={pathname === '/'}>หน้าหลัก</Nav.Link> 
            </Link>
            <Link href="/admin" passHref legacyBehavior>
              <Nav.Link active={pathname === '/admin'}>จัดการข้อมูล (Admin)</Nav.Link>
            </Link>
            <Button 
              variant={theme === 'light' ? 'outline-dark' : 'outline-light'} 
              size="sm" 
              onClick={toggleTheme}
              className="rounded-pill px-3"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}