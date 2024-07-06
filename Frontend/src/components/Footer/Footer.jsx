import React from 'react'

export default function Foot() {
  return (
    <footer className="bg-violet-200 text-grey-500 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-xl mb-2">Get to Know Us</h3>
            <ul>
              <li className="mb-1"><a href="#">About Us</a></li>
              <li className="mb-1"><a href="#">Careers</a></li>
              <li className="mb-1"><a href="#">Press Releases</a></li>
              <li className="mb-1"><a href="#">Book Science</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Connect with Us</h3>
            <ul>
              <li className="mb-1"><a href="#">Facebook</a></li>
              <li className="mb-1"><a href="#">Twitter</a></li>
              <li className="mb-1"><a href="#">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Make Money with Us</h3>
            <ul>
              <li className="mb-1"><a href="#">Sell on Books</a></li>
              <li className="mb-1"><a href="#">Sell under Books Accelerator</a></li>
              <li className="mb-1"><a href="#">Protect and Build Your Brand</a></li>
              <li className="mb-1"><a href="#">Amazon Global Selling</a></li>
              <li className="mb-1"><a href="#">Become an Affiliate</a></li>
              <li className="mb-1"><a href="#">Fulfilment by Books</a></li>
              <li className="mb-1"><a href="#">Advertise Your Products</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Let Us Help You</h3>
            <ul>
              <li className="mb-1"><a href="#">COVID-19</a></li>
              <li className="mb-1"><a href="#">Your Account</a></li>
              <li className="mb-1"><a href="#">Returns Centre</a></li>
              <li className="mb-1"><a href="#">Recalls and Product Safety Alerts</a></li>
              <li className="mb-1"><a href="#">100% Purchase Protection</a></li>
              <li className="mb-1"><a href="#">Books App Download</a></li>
              <li className="mb-1"><a href="#">Help</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            
            <div className="text-center">
              <button className="bg-gray-700 text-white px-4 py-2 rounded">English</button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded ml-2">India</button>
            </div>
          </div>
          <div className="text-center">
            <p>&copy; 1996-2024, Books.com, Inc. or its affiliates</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="hover:underline">Conditions of Use & Sale</a>
              <a href="#" className="hover:underline">Privacy Notice</a>
              <a href="#" className="hover:underline">Interest-Based Ads</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

