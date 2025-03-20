import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-2 mt-auto w-100" style={{ fontSize: "0.8rem", fontFamily: "'Poppins', sans-serif" }}>
            <div className="container">
                <p className="mb-1">&copy; 2025 CAA900-PRIME. All Rights Reserved.</p>
                <p className="mb-1">Empowering Collaboration, Innovation, and Excellence.</p>
                <div className="d-flex justify-content-center gap-2">
                    <span>Team:</span>
                    <a href="#" className="text-white text-decoration-none">ajaysharma2053</a>
                    <a href="#" className="text-white text-decoration-none">Aniket-Banik</a>
                    <a href="#" className="text-white text-decoration-none">Omar BaGunaid</a>
                    <a href="#" className="text-white text-decoration-none">pratima-121</a>
                    <a href="#" className="text-white text-decoration-none">rgaraween</a>
                </div>
                <p className="mt-1" style={{ fontSize: "0.75rem" }}>Bringing Together Passionate Individuals to Drive Meaningful Impact.</p>
            </div>
        </footer>
    );
};

export default Footer;
