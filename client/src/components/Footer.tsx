
function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-8" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div className="text-center mb-4 md:mb-0">
                <span className="font-bold text-2xl text-center ">Employee Management System</span>
                </div>
        
            <div className="container mx-auto px-28 md:px-8 mt-6 ml-8">
                <p className="text-center text-gray-400 text-sm ml-8">
                    &copy; {new Date().getFullYear()}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;