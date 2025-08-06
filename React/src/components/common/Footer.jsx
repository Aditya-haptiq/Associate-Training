import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
const Footer = () => {
  return (
    <footer className=" bg-gray-950 text-white"> 
         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-12'>
  
        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8'>
           {/* Company Info */}
           <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-primary-500 rounded-lg  flex justify-center items-center'>
               <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">Clothify</span>
            </div>
            <p className='text-grey-400 text-sm leading-6'>Your ultimate destination for premium fashion and clothing. We bring you the latest trends with uncompromising quality.</p>
              <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
           </div>

        {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Products
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Shipping Info
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Returns & Exchanges
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Size Guide
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                FAQ
              </a>
            </div>
          </div>


  {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Baner Pune 411069</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">support@Clothify.com</span>
              </div>
            </div>
          </div>
        </div>

           <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Clothify. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        </div>
      
    </footer>
  );
}

export default Footer;


































// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">S</span>
//               </div>
//               <span className="text-xl font-bold">StyleHub</span>
//             </div>
//             <p className="text-gray-400 text-sm leading-6">
//               Your ultimate destination for premium fashion and clothing. We bring you the latest trends with uncompromising quality.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
//                 <Instagram className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Quick Links</h3>
//             <div className="space-y-2">
//               <Link to="/" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Home
//               </Link>
//               <Link to="/products" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Products
//               </Link>
//               <Link to="/about" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 About Us
//               </Link>
//               <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Contact
//               </Link>
//             </div>
//           </div>

//           {/* Customer Service */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Customer Service</h3>
//             <div className="space-y-2">
//               <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Shipping Info
//               </a>
//               <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Returns & Exchanges
//               </a>
//               <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Size Guide
//               </a>
//               <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 FAQ
//               </a>
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Contact Info</h3>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
//                 <span className="text-gray-400 text-sm">123 Fashion Street, Style City, SC 12345</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
//                 <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
//                 <span className="text-gray-400 text-sm">support@stylehub.com</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-gray-400 text-sm">
//               © 2025 StyleHub. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Privacy Policy
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
//                 Terms of Service
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;