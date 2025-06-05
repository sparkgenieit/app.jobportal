"use client";
import { useEffect, useState } from 'react';
import './Footer.css';
import Link from 'next/link';

function Footer() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoader(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <footer id="footer" className="footer">
        <div className="footer-content">
          <div className="container">
            <div className="row">

              <div className="col-lg-3 col-md-6">
                <div className="footer-info">
                  <h3>Job Board</h3>
                  <p>
                    A108 Adam Street <br />
                    NY 535022, USA<br /><br />
                    <strong>Phone:</strong> +1 5589 55488 55<br />
                    <strong>Email:</strong> info@example.com<br />
                  </p>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul className='list-unstyled no-underline text-black'>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/aboutus">About us</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li><Link href="/termsofservice">Terms of service</Link></li>
                  <li><Link href="/privacypolicy">Privacy policy</Link></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul className='list-unstyled'>
                  <li><Link href="/web-design">Web Design</Link></li>
                  <li><Link href="/web-development">Web Development</Link></li>
                  <li><Link href="/product-management">Product Management</Link></li>
                  <li><Link href="/marketing">Marketing</Link></li>
                  <li><Link href="/graphic-design">Graphic Design</Link></li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Our Newsletter</h4>
                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                <form className='flex gap-2'>
                  <input type="email" name="email" className='form-control' />
                  <input type="button" value="Subscribe" className='btn' />
                </form>
              </div>

            </div>
          </div>
        </div>

        <div className="footer-legal text-center">
          <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <div className="copyright">
                &copy; Copyright <strong><span>Job Board</span></strong>. All Rights Reserved
              </div>
              <div className="credits">
                Designed by <Link href="https://sparkgenieit.com/">Spark Genie IT Solutions</Link>
              </div>
            </div>

            <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
              <Link href="#"><i className="bi bi-twitter"></i></Link>
              <Link href="#"><i className="bi bi-facebook"></i></Link>
              <Link href="#"><i className="bi bi-instagram"></i></Link>
              <Link href="#"><i className="bi bi-skype"></i></Link>
              <Link href="#"><i className="bi bi-linkedin"></i></Link>
            </div>
          </div>
        </div>
      </footer>

      <Link href="#" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </Link>

      {loader && <div id="preloader"></div>}
    </>
  );
}

export default Footer;
