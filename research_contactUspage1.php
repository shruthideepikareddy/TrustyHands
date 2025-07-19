<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Trustyhands Premium Service Platform</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --dark-moss-green: #606c38;
            --pakistan-green: #283618;
            --cornsilk: #fefae0;
            --earth-yellow: #dda15e;
            --tigers-eye: #bc6c25;
            
            --primary: var(--dark-moss-green);
            --secondary: var(--earth-yellow);
            --accent: var(--tigers-eye);
            --light-background: var(--cornsilk);
            --dark-background: var(--pakistan-green);
            --white: #ffffff;
            --light-gray: #f8f9f8;
            --text: #333;
            --text-light: #666;
            --text-footer: #ddd;
            --shadow: 0 4px 16px rgba(0,0,0,0.08);
            --transition: all 0.3s ease;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Roboto', sans-serif;
            background-color: var(--light-gray);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
            font-size: 14px;
        }
        
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header Styles */
        header {
            background-color: var(--white);
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 22px;
            font-weight: 700;
            color: var(--primary);
            letter-spacing: 0.5px;
        }
        
        .logo i {
            color: var(--accent);
        }
        
        nav ul {
            display: flex;
            list-style: none;
            gap: 20px;
        }
        
        nav a {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            transition: var(--transition);
            position: relative;
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 20px;
        }
        
        nav a:hover {
            color: var(--primary);
            background: rgba(96, 108, 56, 0.1);
        }
        
        nav a.active {
            color: var(--primary);
            background: rgba(96, 108, 56, 0.1);
            font-weight: 600;
        }
        
        nav a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
            height: 3px;
            background-color: var(--primary);
            border-radius: 3px;
        }
        
        .auth-buttons {
            display: flex;
            gap: 10px;
        }
        
        .btn {
            padding: 8px 20px;
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            border: none;
            font-size: 13px;
            letter-spacing: 0.2px;
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
        }
        
        .btn-outline:hover {
            background-color: var(--primary);
            color: var(--white);
            transform: translateY(-3px);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary), #728c45);
            color: var(--white);
            box-shadow: 0 3px 10px rgba(96, 108, 56, 0.3);
        }
        
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 12px rgba(96, 108, 56, 0.4);
        }
        
        .btn-darker {
            background: linear-gradient(135deg, var(--primary),#283618);
            color: var(--white);
            box-shadow: 0 3px 10px rgba(96, 108, 56, 0.3);
        }
        
        /* hero section */
        .about-hero {
            background: linear-gradient(rgba(40, 54, 24, 0.85), rgba(40, 54, 24, 0.85)), 
                        url('https://as2.ftcdn.net/jpg/03/05/52/27/1000_F_305522726_Veyo5X9NV9KZ7LCfPbhwJXn9dUqgMJ8i.jpg');
            background-size: cover;
            background-position: center;
            color: var(--white);
            text-align: center;
            padding: 70px 0; /* Reduced padding */
            margin-bottom: 30px; /* Reduced margin */
        }
        
        .about-hero h1 {
            font-size: 2.5rem; /* Slightly smaller */
            margin-bottom: 15px; /* Reduced margin */
            font-weight: 700;
        }
        
        .about-hero p {
            font-size: 1.1rem; /* Slightly smaller */
            max-width: 700px;
            margin: 0 auto;
            opacity: 0.9;
        }
        
        /* Contact Section */
        .contact-container {
            display: flex;
            gap: 30px;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }
        
        .contact-form-container, .contact-info-container {
            flex: 1;
            min-width: 300px;
        }
        
        .contact-card {
            background: var(--white);
            border-radius: 14px;
            padding: 25px;
            box-shadow: var(--shadow);
            height: 100%;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(96, 108, 56, 0.1);
            transition: var(--transition);
        }
        
        .contact-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .contact-card h2 {
            font-size: 1.3rem;
            margin-bottom: 20px;
            color: var(--primary);
            position: relative;
            padding-bottom: 12px;
        }
        
        .contact-card h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: var(--secondary);
            border-radius: 2px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: var(--text);
            font-size: 0.9rem;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px 15px;
            border-radius: 8px;
            border: 2px solid rgba(96, 108, 56, 0.15);
            font-size: 0.9rem;
            transition: var(--transition);
            font-family: 'Roboto', sans-serif;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 3px rgba(96, 108, 56, 0.1);
        }
        
        .form-group textarea {
            min-height: 120px;
            resize: vertical;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .info-item {
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }
        
        .info-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(96, 108, 56, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 1.1rem;
            flex-shrink: 0;
        }
        
        .info-content h3 {
            font-size: 1rem;
            margin-bottom: 5px;
            color: var(--primary);
        }
        
        .info-content p {
            color: var(--text-light);
            line-height: 1.5;
            font-size: 0.9rem;
        }
        
        .info-content a {
            color: var(--primary);
            text-decoration: none;
            transition: var(--transition);
        }
        
        .info-content a:hover {
            color: var(--accent);
            text-decoration: underline;
        }
        
        .business-hours {
            margin-top: 8px;
            font-size: 0.9rem;
        }
        
        .business-hours li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            font-size: 0.9rem;
        }
        
        .business-hours .hours {
            font-weight: 500;
            color: var(--primary);
        }
        
        /* Map Section */
        .map-container {
            height: 350px;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: var(--shadow);
            margin-bottom: 40px;
            position: relative;
            background: linear-gradient(rgba(96, 108, 56, 0.1)), 
                        url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            text-align: center;
        }
        
        .map-overlay {
            background: rgba(40, 54, 24, 0.85);
            padding: 20px;
            border-radius: 10px;
            max-width: 450px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
        }
        
        .map-overlay h3 {
            color: var(--secondary);
            margin-bottom: 12px;
            font-size: 1.2rem;
        }
        
        .map-overlay p {
            margin-bottom: 8px;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        .map-overlay i {
            color: var(--secondary);
            margin-right: 8px;
            width: 18px;
        }
        
        /* Regional Offices */
        .regional-offices {
            padding: 40px 0;
            background: var(--light-background);
            border-radius: 14px;
            margin-bottom: 40px;
        }
        
        .section-title {
            text-align: center;
            font-size: 1.6rem;
            margin-bottom: 30px;
            color: var(--primary);
            position: relative;
        }
        
        .section-title::after {
            content: '';
            display: block;
            width: 60px;
            height: 3px;
            background: var(--accent);
            margin: 12px auto 0;
            border-radius: 3px;
        }
        
        .offices-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
        }
        
        .office-card {
            background: var(--white);
            border-radius: 14px;
            padding: 22px;
            box-shadow: var(--shadow);
            transition: var(--transition);
            text-align: center;
            border: 1px solid rgba(96, 108, 56, 0.1);
        }
        
        .office-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.1);
        }
        
        .office-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(96, 108, 56, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            font-size: 1.5rem;
            color: var(--primary);
        }
        
        .office-card h3 {
            font-size: 1.1rem;
            margin-bottom: 12px;
            color: var(--primary);
        }
        
        .office-card p {
            color: var(--text-light);
            margin-bottom: 8px;
            line-height: 1.5;
            font-size: 0.9rem;
        }
        
        /* FAQ Section */
        .faqs {
            padding: 40px 0;
            background: rgba(188, 108, 37, 0.05);
            border-radius: 14px;
            margin-bottom: 40px;
        }
        
        .faq-container {
            max-width: 750px;
            margin: 0 auto;
        }
        
        .faq-item {
            margin-bottom: 15px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
        }
        
        .faq-question {
            padding: 15px 20px;
            background: var(--primary);
            color: var(--white);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .faq-answer {
            padding: 18px;
            background: var(--white);
            display: none;
            font-size: 0.9rem;
            line-height: 1.6;
        }
        
        .faq-answer.active {
            display: block;
        }
        
        /* Footer */
        footer {
            background-color: var(--dark-background);
            padding: 40px 0 15px;
            position: relative;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 30px;
            margin-bottom: 25px;
            position: relative;
            z-index: 1;
        }
        
        .footer-column h3 {
            font-size: 1.2rem;
            margin-bottom: 18px;
            color: var(--earth-yellow);
        }
        
        .footer-column ul {
            list-style: none;
        }
        
        .footer-column ul li {
            margin-bottom: 10px;
        }
        
        .footer-column a {
            color: var(--text-footer);
            text-decoration: none;
            transition: var(--transition);
            font-size: 0.9rem;
        }
        
        .footer-column a:hover {
            color: var(--earth-yellow);
            padding-left: 3px;
        }
        
        .social-icons {
            display: flex;
            gap: 12px;
            margin-top: 18px;
        }
        
        .social-icons a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background-color: rgba(221, 161, 94, 0.15);
            border-radius: 50%;
            transition: var(--transition);
            font-size: 1rem;
            color: var(--earth-yellow);
        }
        
        .social-icons a:hover {
            background-color: var(--earth-yellow);
            color: var(--dark-background);
            transform: translateY(-3px);
        }
        
        .copyright {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: var(--text-footer);
            position: relative;
            z-index: 1;
            font-size: 0.9rem;
        }
        
        /* Form success message */
        .form-success {
            display: none;
            background: var(--primary);
            color: var(--white);
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
            animation: fadeIn 0.5s ease;
        }
        a.btn {
    text-decoration: none;
}

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
            .contact-container {
                flex-direction: column;
            }
            
            .contact-form-container,
            .contact-info-container {
                width: 100%;
            }
        }
        
        @media (max-width: 768px) {
            .header-container {
                flex-direction: column;
                gap: 12px;
            }
            
            nav ul {
                gap: 8px;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .page-title {
                padding: 50px 0 30px;
            }
            
            .page-title h1 {
                font-size: 1.6rem;
            }
            
            .section-title {
                font-size: 1.4rem;
            }
            
            .map-container {
                height: 300px;
            }
        }
        
        @media (max-width: 480px) {
            .page-title h1 {
                font-size: 1.5rem;
            }
            
            .contact-card {
                padding: 20px;
            }
            
            .info-item {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .info-icon {
                margin-bottom: 8px;
            }
            
            .auth-buttons {
                flex-direction: column;
                gap: 8px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container header-container">
            <div class="logo">
                <i class="fas fa-hands-helping"></i>
                <span>Trustyhands</span>
            </div>
            <nav>
                <ul>
                <li><a href="research_homepage1.php">Home</a></li>
                <li><a href="research_aboutUspage1.php">About Us</a></li>
                <li><a href="research_servicespage1.php" class="active">Services</a></li>
                <li><a href="research_howItWorkspage1.php">How It Works</a></li>
                <li><a href="research_contactUspage1.php">Contact Us</a></li>
            </ul>
            </nav>
            <div class="auth-buttons">
                <a href="research_index.php#signIn" class="btn btn-outline">Log In</a>
                <a href="research_index.php#signup" class="btn btn-primary">Sign Up</a>
            </div>
        </div>
    </header>

    <!-- Page Title -->
    <section class="about-hero">
        <div class="container">
            <h1>Contact Us</h1>
            <p>We're here to help and answer any questions you might have</p>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
        <div class="container">
            <div class="contact-container">
                <!-- Replace the existing form section with this code -->
<div class="contact-form-container">
    <div class="contact-card">
        <h2>Send Us a Message</h2>
        <form id="contactForm" action="research_contactUsBackend.php" method="POST">
            <div class="form-group">
                <label for="full_name">Full Name</label>
                <input type="text" id="full_name" name="full_name" placeholder="Enter your full name" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>
            
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number">
            </div>
            
            <div class="form-group">
                <label for="subject">Subject</label>
                <select id="subject" name="subject" required>
                    <option value="" disabled selected>Select a subject</option>
                    <option value="service">Service Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="worker">Become a Worker</option>
                    <option value="feedback">Feedback/Suggestions</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="How can we help you?" required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 0.95rem;">Send Message</button>
        </form>
        
        <?php if(isset($_SESSION['form_success'])): ?>
            <div class="form-success" id="formSuccess" style="display: block;">
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 12px;"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
            <?php unset($_SESSION['form_success']); ?>
        <?php else: ?>
            <div class="form-success" id="formSuccess">
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 12px;"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
        <?php endif; ?>
    </div>
</div>
                
                <div class="contact-info-container">
                    <div class="contact-card">
                        <h2>Our Guntur Office</h2>
                        <div class="contact-info">
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="info-content">
                                    <h3>Headquarters</h3>
                                    <p>Plot No. 45, Srinagar Colony<br>
                                    Near Amareswara Temple<br>
                                    Guntur, Andhra Pradesh 522006</p>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div class="info-content">
                                    <h3>Phone & Email</h3>
                                    <p>
                                        <a href="tel:+918639452100">+91 86394 52100</a><br>
                                        <a href="tel:+918639452101">+91 86394 52101</a><br>
                                        <a href="mailto:guntur@trustyhands.com">guntur@trustyhands.com</a>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="info-content">
                                    <h3>Business Hours</h3>
                                    <ul class="business-hours">
                                        <li>
                                            <span>Monday - Saturday :</span>
                                            <span class="hours">9:00 AM - 8:00 PM</span>
                                        </li>
                                        <li>
                                            <span>Sunday :</span>
                                            <span class="hours">10:00 AM - 4:00 PM</span>
                                        </li>
                                        <li>
                                            <span>Public Holidays :</span>
                                            <span class="hours">10:00 AM - 2:00 PM</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-headset"></i>
                                </div>
                                <div class="info-content">
                                    <h3>24/7 Customer Support</h3>
                                    <p>For urgent matters, our support team is available around the clock to assist you with any service-related issues.</p>
                                    <p style="margin-top: 10px;">
                                        <a href="tel:+919100112233">+91 91001 12233 (Emergency)</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Map Section -->
            <div class="map-container">
                <div class="map-overlay">
                    <h3>Visit Our Guntur Office</h3>
                    <p><i class="fas fa-map-marker-alt"></i> Plot No. 45, Srinagar Colony, Guntur</p>
                    <p><i class="fas fa-clock"></i> Open today: 9:00 AM - 8:00 PM</p>
                    <p><i class="fas fa-phone"></i> +91 86394 52100</p>
                    <p><i class="fas fa-train"></i> 10 min from Guntur Railway Station</p>
                    <p><i class="fas fa-subway"></i> Near Amareswara Temple Bus Stop</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Regional Offices -->
    <section class="regional-offices">
        <div class="container">
            <h2 class="section-title">Our Regional Offices</h2>
            <div class="offices-container">
                <div class="office-card">
                    <div class="office-icon">
                        <i class="fas fa-city"></i>
                    </div>
                    <h3>Vijayawada Office</h3>
                    <p>3rd Floor, Krishna Tower<br>Benz Circle, Vijayawada</p>
                    <p><i class="fas fa-phone"></i> +91 86624 78542</p>
                    <p><i class="fas fa-envelope"></i> vijayawada@trustyhands.com</p>
                </div>
                
                <div class="office-card">
                    <div class="office-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <h3>Visakhapatnam Office</h3>
                    <p>Seethammadhara North<br>Visakhapatnam, AP 530013</p>
                    <p><i class="fas fa-phone"></i> +91 89125 47896</p>
                    <p><i class="fas fa-envelope"></i> vizag@trustyhands.com</p>
                </div>
                
                <div class="office-card">
                    <div class="office-icon">
                        <i class="fas fa-landmark"></i>
                    </div>
                    <h3>Tirupati Office</h3>
                    <p>Renigunta Road<br>Tirupati, AP 517501</p>
                    <p><i class="fas fa-phone"></i> +91 87722 14578</p>
                    <p><i class="fas fa-envelope"></i> tirupati@trustyhands.com</p>
                </div>
                
                <div class="office-card">
                    <div class="office-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3>Nellore Office</h3>
                    <p>Dargamitta<br>Nellore, AP 524003</p>
                    <p><i class="fas fa-phone"></i> +91 86123 65478</p>
                    <p><i class="fas fa-envelope"></i> nellore@trustyhands.com</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQs Section -->
    <section class="faqs">
        <div class="container">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <div class="faq-container">
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        How quickly can I expect a response to my inquiry?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>We respond to all inquiries within 24 hours during business days. For urgent matters, please call our 24/7 support line at +91 91001 12233.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Do you provide services throughout Andhra Pradesh?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes! While our headquarters is in Guntur, we provide services across all districts of Andhra Pradesh including Vijayawada, Visakhapatnam, Tirupati, and Nellore.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Can I visit your Guntur office without appointment?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>We recommend scheduling an appointment to ensure we can give you proper attention. However, walk-ins are welcome during business hours.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        Do you have regional language support?
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes, our customer support team is fluent in Telugu, Hindi, and English to serve you better.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
 <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <div class="logo" style="margin-bottom: 15px; font-size: 20px; color: var(--earth-yellow);">
                        <i class="fas fa-hands-helping"></i>
                        <span>Trustyhands</span>
                    </div>
                    <p style="font-size: 0.9rem; max-width: 300px; margin-bottom: 18px; color: var(--text-footer);">
                        Connecting customers with trusted local workers for any task, anytime, anywhere.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="research_homepage1.php">Home</a></li>
                        <li><a href="research_aboutUspage1.php">About Us</a></li>
                        <li><a href="research_servicespage1.php">Services</a></li>
                        <li><a href="research_howitWorkspage1.php">How it Works</a></li>
                        <li><a href="research_contactUspage1.php">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="helpcenter.php">Help Center</a></li>
                        <li><a href="safety.php">Safety Guidelines</a></li>
                        <li><a href="worker_resources.php">Worker Resources</a></li>
                        <li><a href="customer_resources.php">Customer Resources</a></li>
                        <li><a href="community.php">Community</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="terms.php">Terms of Service</a></li>
                        <li><a href="Privacy_Policy.php">Privacy Policy</a></li>
                        <li><a href="Worker_Agreement.php">Worker Agreement</a></li>
                        <li><a href="Cookie_Policy.php">Cookie Policy</a></li>
                        <li><a href="GDPR.php">GDPR Compliance</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2025 Trustyhands. All rights reserved. Premium Service Platform</p>
            </div>
        </div>
    </footer>
    <script>
        // Function to toggle FAQ
        function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const isActive = answer.classList.contains('active');

            // Close all open FAQs
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });

            // Toggle the clicked FAQ
            if (!isActive) {
                answer.classList.add('active');
            }
        }
        

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.textContent === 'Contact Us') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Auto-hide success message after 5 seconds
    const successMessage = document.getElementById('formSuccess');
    if (successMessage.style.display === 'block') {
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});
    </script>
</body>
</html>