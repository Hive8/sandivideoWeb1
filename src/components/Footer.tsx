'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-8" style={{ height: '200px' }}>
      <div className="max-w-6xl mx-auto h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sandi Video</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for streaming movies and TV shows.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Browse</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Movies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TV Shows</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Genres</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">My List</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Watch History</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Settings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Sandi Video. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.787.017 6.665.097 5.606.161 4.927.283 4.332.497c-.67.234-1.237.547-1.803 1.113C1.963 2.175 1.65 2.742 1.416 3.412c-.214.595-.336 1.274-.4 2.333C.933 7.787.917 8.396.917 12.017s.017 4.23.097 5.352c.064 1.059.186 1.738.4 2.333.234.67.547 1.237 1.113 1.803.566.566 1.133.879 1.803 1.113.595.214 1.274.336 2.333.4C7.787 23.067 8.396 23.083 12.017 23.083s4.23-.017 5.352-.097c1.059-.064 1.738-.186 2.333-.4.67-.234 1.237-.547 1.803-1.113.566-.566.879-1.133 1.113-1.803.214-.595.336-1.274.4-2.333.08-1.122.097-1.731.097-5.352s-.017-4.23-.097-5.352c-.064-1.059-.186-1.738-.4-2.333-.234-.67-.547-1.237-1.113-1.803C21.825 1.963 21.258 1.65 20.588 1.416c-.595-.214-1.274-.336-2.333-.4C16.233.933 15.624.917 12.017.917 8.396.917 7.787.933 6.665.997 5.606 1.061 4.927 1.183 4.332 1.397c-.67.234-1.237.547-1.803 1.113C1.963 2.459 1.65 3.026 1.416 3.696c-.214.595-.336 1.274-.4 2.333C.933 7.213.917 7.822.917 12.017s.017 4.23.097 5.352c.064 1.059.186 1.738.4 2.333.234.67.547 1.237 1.113 1.803.566.566 1.133.879 1.803 1.113.595.214 1.274.336 2.333.4C7.787 23.067 8.396 23.083 12.017 23.083s4.23-.017 5.352-.097c1.059-.064 1.738-.186 2.333-.4.67-.234 1.237-.547 1.803-1.113.566-.566.879-1.133 1.113-1.803.214-.595.336-1.274.4-2.333.08-1.122.097-1.731.097-5.352s-.017-4.23-.097-5.352c-.064-1.059-.186-1.738-.4-2.333-.234-.67-.547-1.237-1.113-1.803C21.825 1.963 21.258 1.65 20.588 1.416c-.595-.214-1.274-.336-2.333-.4C16.233.933 15.624.917 12.017.917zM12.017 5.839a6.178 6.178 0 100 12.356 6.178 6.178 0 000-12.356zm0 10.178a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;