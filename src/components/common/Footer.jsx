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
                 <p>
                   InfoSol NZ Limited <br />
                    PO Box 27400, Auckland, New Zealand<br /><br />
                   
                  </p>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                
                <ul className='list-unstyled no-underline text-black'>
                
                  <li><Link href="/termsofservice"  className="footer-link">Terms and Conditions</Link></li>
                  <li><Link href="/privacypolicy"  className="footer-link">Privacy policy</Link></li>
                </ul>
              </div>

            
             
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
