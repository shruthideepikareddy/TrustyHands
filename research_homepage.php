<?php
session_start();
if(!isset($_SESSION['user_id'])) {
    header("Location: research_homepage1.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trustyhands - Premium Service Platform</title>
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
            background-color: var(--white);
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
            text-decoration: none;
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
        .btn-darker{
             background: linear-gradient(135deg, var(--primary),#283618);
            color: var(--white);
            box-shadow: 0 3px 10px rgba(96, 108, 56, 0.3);
        }
        /* Hero Carousel */
        .hero-carousel {
            position: relative;
            height: 65vh;
            overflow: hidden;
            background: linear-gradient(135deg, var(--light-background), #fdf7d5);
            border-radius: 0 0 20px 20px;
            margin-bottom: 10px; /* Reduced gap from 30px */
        }
        
        .carousel-slide {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .carousel-slide.active {
            opacity: 1;
        }
        
        .slide-content {
            position: relative;
            z-index: 2;
            text-align: center;
            color: var(--text);
            width: 100%;
            max-width: 750px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .slide-content h1 {
            font-size: 2.2rem;
            margin-bottom: 15px;
            font-weight: 700;
            line-height: 1.25;
            color: var(--dark-background);
        }
        
        .slide-content h1 span {
            color: var(--primary);
        }
        
        .slide-content p {
            font-size: 1rem;
            margin-bottom: 25px;
            color: var(--text-light);
            max-width: 550px;
            margin: 0 auto 25px;
        }
        
        .hero-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
        }
        
        .btn-secondary {
            background: linear-gradient(135deg, var(--secondary), #bc6c25);
            color: var(--white);
            box-shadow: 0 3px 10px rgba(221, 161, 94, 0.3);
        }
        
        .btn-secondary:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 12px rgba(221, 161, 94, 0.4);
        }
        
        .carousel-indicators {
            position: absolute;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        }
        
        .indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: rgba(96, 108, 56, 0.3);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .indicator.active {
            background-color: var(--primary);
            transform: scale(1.3);
        }
        
        /* How It Works */
        .how-it-works {
            padding: 30px 0 30px; /* Reduced top padding from 40px */
            background-color: var(--white);
        }
        
        .section-title {
            text-align: center;
            font-size: 1.8rem;
            margin-bottom: 25px; /* Reduced margin from 35px */
            color: var(--primary);
            position: relative;
        }
        
        .section-title::after {
            content: '';
            display: block;
            width: 70px;
            height: 3px;
            background: var(--accent);
            margin: 12px auto 0;
            border-radius: 3px;
        }
        
        .steps {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 12px; /* Reduced gap from 20px */
        }
        
        .step-card {
            background: rgba(96, 108, 56, 0.05); /* Changed background */
            border-radius: 14px;
            padding: 25px;
            width: 260px;
            text-align: center;
            box-shadow: var(--shadow);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(96, 108, 56, 0.08); /* Added subtle border */
            transform: translateY(0);
        }
        
        .step-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.1);
            background: rgba(96, 108, 56, 0.08); /* Enhanced hover effect */
        }
        
        .step-icon {
            font-size: 2.4rem;
            color: var(--primary);
            margin-bottom: 15px;
            background: rgba(96, 108, 56, 0.08);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .step-title {
            font-size: 1.2rem;
            margin-bottom: 12px;
            color: var(--text);
            font-weight: 600;
        }
        
        /* Services Section */
        .services {
            padding: 50px 0 40px; /* Adjusted padding */
            background: var(--light-gray);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 16px;
            margin-top: 25px;
        }
        
        .service-card {
            background: var(--white);
            border-radius: 10px;
            padding: 22px 12px;
            text-align: center;
            box-shadow: var(--shadow);
            transition: var(--transition);
            cursor: pointer;
            border: 1px solid rgba(96, 108, 56, 0.1);
            height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .service-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            border-color: rgba(96, 108, 56, 0.3);
        }
        
        .service-icon {
            font-size: 2rem;
            color: var(--primary);
            margin-bottom: 12px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .service-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 6px;
            color: var(--text);
        }
        
        .service-desc {
            color: var(--text-light);
            font-size: 0.8rem;
            line-height: 1.4;
        }
        
        .view-more {
            text-align: center;
            margin-top: 30px;
        }
        
        .view-more-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
             background-color: #bc6c25;
            color: var(--white);
            font-weight: 600;
            text-decoration: none;
            font-size: 1rem;
            transition: var(--transition);
            padding: 10px 25px;
            border: 2px solid var(--primary);
            border-radius: 30px;
        }
        
        .view-more-btn:hover {
            background-color: var(--white);
            color: var(--primary);
            transform: translateY(-3px);
        }
        
        
        /* Customers Section */
        .customers {
            padding: 50px 0 40px; /* Reduced padding */
            background-color: var(--white);
            position: relative;
            overflow: hidden;
        }
        
        .customer-content {
            display: flex;
            gap: 35px;
            align-items: center;
            position: relative;
            z-index: 1;
        }
        
        .customer-text {
            flex: 1;
        }
        
        .customer-image {
            flex: 1;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 18px 35px rgba(0,0,0,0.06);
            height: 360px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .customer-image::before {
            content: "";
            position: absolute;
            top: 12px;
            left: 12px;
            right: 12px;
            bottom: 12px;
            border: 2px dashed var(--primary);
            border-radius: 10px;
            opacity: 0.3;
            z-index: 2;
        }
        
        .customer-image::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        
            z-index: 1;
        }
        
        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 25px;
        }
        
        .benefit-card {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 18px;
            background: rgba(96, 108, 56, 0.05);
            border-radius: 10px;
            transition: var(--transition);
        }
        
        .benefit-card:hover {
            transform: translateY(-4px);
            background: var(--white);
            box-shadow: var(--shadow);
        }
        
        .benefit-icon {
            font-size: 1.4rem;
            color: var(--primary);
            background: var(--white);
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 3px 8px rgba(0,0,0,0.05);
        }
        
        /* Workers Section */
        .workers {
            padding: 50px 0 40px; /* Reduced padding */
            background: rgba(221, 161, 94, 0.05);
        }
        
        .worker-content {
            display: flex;
            gap: 35px;
            align-items: center;
        }
        
        .worker-text {
            flex: 1;
        }
        
        .worker-image {
            flex: 1;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 18px 35px rgba(0,0,0,0.06);
            height: 360px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .worker-image::before {
            content: "";
            position: absolute;
            top: 12px;
            left: 12px;
            right: 12px;
            bottom: 12px;
            border: 2px dashed var(--secondary);
            border-radius: 10px;
            opacity: 0.3;
            z-index: 2;
        }
        
        .worker-image::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        
        /* Testimonials Section */
        .testimonials {
            padding: 50px 0 40px; /* Reduced padding */
            background: rgba(188, 108, 37, 0.05);
        }
        
        .testimonial-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 22px;
        }
        
        .testimonial {
            background-color: var(--white);
            padding: 25px;
            border-radius: 14px;
            position: relative;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }
        
        .testimonial:hover {
            transform: translateY(-6px);
        }
        
        .testimonial-header {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
        }
        
        .testimonial-header i {
            font-size: 1.8rem;
            color: var(--accent);
            margin-right: 12px;
        }
        
        .testimonial::before {
            content: '"';
            position: absolute;
            top: 12px;
            right: 20px;
            font-size: 4.5rem;
            color: rgba(188, 108, 37, 0.1);
            font-family: Georgia, serif;
            line-height: 1;
            z-index: 0;
        }
        
        .client {
            display: flex;
            align-items: center;
            margin-top: 20px;
        }
        
        .client-avatar {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            margin-right: 12px;
            background: var(--light-background);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            color: var(--primary);
            font-weight: bold;
        }
        
        .client-info h4 {
            color: var(--text);
            font-size: 1rem;
            margin-bottom: 4px;
        }
        
        .client-info p {
            color: var(--text-light);
            font-size: 0.85rem;
        }
        
        /* CTA Section */
        .cta {
            padding: 50px 0 40px; /* Reduced padding */
            background: linear-gradient(135deg, var(--primary), #728c45);
            color: var(--white);
            text-align: center;
            position: relative;
            overflow: hidden;
            border-radius: 18px;
            margin: 0 20px 30px; /* Reduced bottom margin */
        }
        
        .cta h2 {
            font-size: 2rem;
            margin-bottom: 18px;
            position: relative;
            z-index: 1;
        }
        
        .cta p {
            font-size: 1rem;
            max-width: 550px;
            margin: 0 auto 30px;
            position: relative;
            z-index: 1;
            color: rgba(255,255,255,0.9);
        }
        
        /* Footer */
        footer {
            background-color: var(--dark-background);
            padding: 40px 0 15px; /* Reduced padding */
            position: relative;
            margin-top: 0; /* Removed top margin */
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 30px;
            margin-bottom: 30px; /* Reduced margin */
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

        
        
        /* Responsive Design */
        @media (max-width: 992px) {
            .header-container {
                flex-direction: column;
                gap: 12px;
            }
            
            nav ul {
                gap: 10px;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .slide-content h1 {
                font-size: 1.9rem;
            }
            
            .slide-content p {
                font-size: 0.95rem;
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .steps {
                flex-direction: column;
                align-items: center;
            }
            
            .section-title {
                font-size: 1.6rem;
            }
            
            .customer-content, .worker-content {
                flex-direction: column;
            }
            
            .customer-image, .worker-image {
                width: 100%;
                margin-top: 25px;
            }
            
            .hero-carousel {
                height: 60vh;
            }
        }
        
        @media (max-width: 768px) {
            .benefits-grid {
                grid-template-columns: 1fr;
            }
            
            .testimonial-container {
                grid-template-columns: 1fr;
            }
            
            .services-grid {
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            }
            
            .step-card {
                width: 100%;
                max-width: 320px;
            }
            
            nav a {
                padding: 6px 10px;
                font-size: 13px;
            }
            
            nav a.active::after {
                width: 40%;
            }
        }
        
        @media (max-width: 480px) {
            .hero-carousel {
                height: 70vh;
            }
            
            .slide-content h1 {
                font-size: 1.6rem;
            }
            
            .cta h2 {
                font-size: 1.6rem;
            }
            
            .services-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .footer-content {
                grid-template-columns: 1fr;
                gap: 25px;
            }
            
            nav ul {
                gap: 5px;
            }
            
            .auth-buttons {
                flex-direction: column;
                gap: 8px;
            }
        }
        a {
    text-decoration: none;
  }
  .user-profile-container {
            position: relative;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .profile-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--dark-moss-green), var(--pakistan-green));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .profile-circle:hover {
            transform: scale(1.05);
        }
        
        .profile-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            width: 220px;
            background: var(--white);
            border-radius: 8px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            z-index: 100;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }
        
        .profile-dropdown.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .profile-dropdown .user-info {
            padding: 15px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .profile-dropdown .user-info .info-initials {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--earth-yellow), var(--tigers-eye));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
        
        .profile-dropdown .user-info .info-text {
            line-height: 1.4;
        }
        
        .profile-dropdown .user-info .info-text .name {
            font-weight: 600;
            color: var(--text);
            font-size: 0.95rem;
        }
        
        .profile-dropdown .user-info .info-text .email {
            font-size: 0.8rem;
            color: var(--text-light);
        }
        
        .profile-dropdown ul {
            list-style: none;
            padding: 10px 0;
        }
        
        .profile-dropdown ul li {
            padding: 10px 20px;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.95rem;
        }
        
        .profile-dropdown ul li:hover {
            background: rgba(96, 108, 56, 0.05);
        }
        
        .profile-dropdown ul li i {
            color: var(--dark-moss-green);
            width: 20px;
        }
        
        .profile-dropdown ul li a {
            color: inherit;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
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
                <li><a href="research_homepage.php" class="active">Home</a></li>
                <li><a href="research_aboutUspage.php">About Us</a></li>
                <li><a href="research_servicespage.php">Services</a></li>
                <li><a href="research_howItWorkspage.php">How It Works</a></li>
                <li><a href="research_contactUspage.php">Contact Us</a></li>
            </ul>
        </nav>
        <div class="auth-buttons">
    <?php if (isset($_SESSION['user_id'])): ?>
        <!-- MODIFIED: Added profile dropdown -->
        <div class="user-profile-container">
            <?php
            // Get user initials - MODIFIED: Added safety checks
            $firstName = $_SESSION['firstName'] ?? 'User';  // Default if not set
            $lastName = $_SESSION['lastName'] ?? '';       // Default empty if not set
            
            $name_parts = array_filter([$firstName, $lastName]); // Filter out empty parts
            $initials = '';
            
            foreach ($name_parts as $part) {
                if (!empty($part)) {
                    $initials .= strtoupper(substr($part, 0, 1));
                }
            }
            $initials = substr($initials, 0, 2) ?: 'U'; // Default to 'U' if no initials
            ?>
            <div class="profile-circle" id="profileToggle">
                <?php echo $initials; ?>
            </div>
            
            <div class="profile-dropdown" id="profileDropdown">
                <div class="user-info">
                    <div class="info-initials"><?php echo $initials; ?></div>
                    <div class="info-text">
                        <!-- MODIFIED: Use safe variables -->
                        <div class="name"><?php echo htmlspecialchars("$firstName $lastName"); ?></div>
                        <div class="email"><?php echo $_SESSION['email']; ?></div>
                    </div>
                </div>
                
                <ul>
                    <li>
                        <a href="research_profilepage.php">
                            <i class="fas fa-user-circle"></i>
                            <span>Your Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="research_bookingspage.php">
                            <i class="fas fa-history"></i>
                            <span>Bookings History</span>
                        </a>
                    </li>
                    <li>
                        <a href="research_workhistorypage.php">
                            <i class="fas fa-briefcase"></i>
                            <span>Work History</span>
                        </a>
                    </li>
                    <li>
                        <a href="research_logout.php">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    <?php else: ?>
        <a href="research_index.php#signIn" class="btn btn-outline">Log In</a>
        <a href="research_index.php#signup" class="btn btn-primary">Sign Up</a>
    <?php endif; ?>
</div>
    </div>
</header>

    <!-- Hero Carousel -->
    <section class="hero-carousel">
        <!-- Slide 1 -->
        <div class="carousel-slide active">
            <div class="slide-content">
                <h1>Find <span>Trusted Professionals</span> For All Your Needs</h1>
                <p>Book verified workers for any task at your convenience. Fast, reliable, and hassle-free service.</p>
                <div class="hero-buttons">
    <a href="research_bookWorker.php" class="btn btn-primary">Find a Worker</a>
    <a href="research_joinAsWorker.php" class="btn btn-secondary">Join as a Worker</a>
</div>
            </div>
        </div>
        
        <!-- Slide 2 -->
        <div class="carousel-slide">
            <div class="slide-content">
                <h1><span>Premium Services</span> At Your Doorstep</h1>
                <p>From plumbing to cleaning, we connect you with the best professionals in your area.</p>
                <div class="hero-buttons">
    <a href="research_bookWorker.php" class="btn btn-primary">Find a Worker</a>
    <a href="research_joinAsWorker.php" class="btn btn-secondary">Join as a Worker</a>
</div>
            </div>
        </div>
        
        <!-- Slide 3 -->
        <div class="carousel-slide">
            <div class="slide-content">
                <h1>Join Our Growing <span>Community</span> Today</h1>
                <p>Earn competitive income by offering your skills and services to thousands of customers.</p>
                <div class="hero-buttons">
    <a href="research_bookWorker.php" class="btn btn-primary">Find a Worker</a>
    <a href="research_joinAsWorker.php" class="btn btn-secondary">Join as a Worker</a>
</div>
            </div>
        </div>
        
        <div class="carousel-indicators">
            <div class="indicator active" data-slide="0"></div>
            <div class="indicator" data-slide="1"></div>
            <div class="indicator" data-slide="2"></div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
        <div class="container">
            <h2 class="section-title">How Trustyhands Works</h2>
            <div class="steps">
                <div class="step-card">
                    <div class="step-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <h3 class="step-title">Create Account</h3>
                    <p>Sign up as a customer or worker in minutes with our simple onboarding process.</p>
                </div>
                <div class="step-card">
                    <div class="step-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 class="step-title">Find or Offer</h3>
                    <p>Customers find skilled workers nearby. Workers offer their services.</p>
                </div>
                <div class="step-card">
                    <div class="step-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h3 class="step-title">Connect & Work</h3>
                    <p>Connect directly, agree on terms, and complete the job efficiently.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services">
        <div class="container">
            <h2 class="section-title">Our Premium Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3 class="service-title">Electrician</h3>
                    <p class="service-desc">Certified professionals for all electrical needs</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-faucet"></i>
                    </div>
                    <h3 class="service-title">Plumbing</h3>
                    <p class="service-desc">Expert solutions for leaks and installations</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-wind"></i>
                    </div>
                    <h3 class="service-title">AC Service</h3>
                    <p class="service-desc">Maintenance and repair for all AC units</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-broom"></i>
                    </div>
                    <h3 class="service-title">Deep Cleaning</h3>
                    <p class="service-desc">Thorough cleaning for homes and offices</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-hammer"></i>
                    </div>
                    <h3 class="service-title">Carpentry</h3>
                    <p class="service-desc">Custom woodwork and furniture repair</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-bath"></i>
                    </div>
                    <h3 class="service-title">Bathroom Cleaning</h3>
                    <p class="service-desc">Sanitization and deep cleaning services</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-snowflake"></i>
                    </div>
                    <h3 class="service-title">Fridge Repair</h3>
                    <p class="service-desc">Expert refrigeration repair and maintenance</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-paint-roller"></i>
                    </div>
                    <h3 class="service-title">Painting</h3>
                    <p class="service-desc">Interior and exterior painting services</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-boxes"></i>
                    </div>
                    <h3 class="service-title">Packers & Movers</h3>
                    <p class="service-desc">Professional packing and relocation services</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h3 class="service-title">Kitchen Cleaning</h3>
                    <p class="service-desc">Deep cleaning for kitchens and appliances</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-hand-sparkles"></i>
                    </div>
                    <h3 class="service-title">Home Sanitization</h3>
                    <p class="service-desc">Professional sanitization for healthy living</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-tv"></i>
                    </div>
                    <h3 class="service-title">TV Repair</h3>
                    <p class="service-desc">Expert repair for all television models</p>
                </div>
            </div>
            <div class="view-more">
                <a href="#" class="view-more-btn">
                    View More Services
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Customers Section -->
    <section class="customers">
        <div class="container">
            <h2 class="section-title">For Customers</h2>
            <div class="customer-content">
            
                <div class="customer-text">
                    <h3 style="font-size: 1.6rem; color: var(--primary); margin-bottom: 18px;">Find Trusted Professionals For All Your Needs</h3>
                    <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 22px;">At Trustyhands, we understand that finding reliable help for your home and business needs can be challenging. Our platform connects you with verified professionals who are ready to help with any task, big or small.</p>
                    
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">Verified Workers</h4>
                                <p style="font-size: 0.85rem;">All professionals undergo thorough background checks</p>
                            </div>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">Ratings & Reviews</h4>
                                <p style="font-size: 0.85rem;">See feedback from other customers before hiring</p>
                            </div>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">Secure Payments</h4>
                                <p style="font-size: 0.85rem;">Safe and hassle-free payment transactions</p>
                            </div>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-headset"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">24/7 Support</h4>
                                <p style="font-size: 0.85rem;">Our dedicated team is always ready to assist you</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- <button class="btn btn-primary" style="margin-top: 25px; padding: 10px 25px;">Find a Worker Now</button> -->
                    <a href="research_bookWorker.php" class="btn btn-primary">Find a Worker Now</a>
                </div>
                <div class="customer-image">
                    <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3746963_xyilhzpcdlfl28ei1uch003889m2z4mgdfwvxnb7_happy-client-vector-customer-person-shaking-hands-partnership-important-client-business-connection-isolated-flat-cartoon-character-illustration.jpg" alt="Customer Image" style="width: 100%; height: auto; border-radius: 14px;">
                </div>
            </div>
        </div>
    </section>

    <!-- Workers Section -->
    <section class="workers">
        <div class="container">
            <h2 class="section-title" style="color: var(--secondary);">For Workers</h2>
            <div class="worker-content">
                <div class="worker-image">
                    <img src="https://static.vecteezy.com/system/resources/previews/023/981/182/original/group-of-people-in-different-professions-businessman-construction-worker-female-doctor-teacher-waiter-chef-cartoon-illustration-free-png.png" alt="Worker Image" style="width: 100%; height: auto; border-radius: 14px;">
                </div>
                <div class="worker-text">
                    <h3 style="font-size: 1.6rem; color: var(--text); margin-bottom: 18px;">Join Our Community of Skilled Professionals</h3>
                    <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 22px;">Trustyhands provides a platform for skilled workers to connect with customers who need their services. Expand your client base, set your own schedule, and grow your business with our professional platform.</p>
                    
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">Competitive Pay</h4>
                                <p style="font-size: 0.85rem;">Set your rates and get paid fairly for your work</p>
                            </div>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">Flexible Schedule</h4>
                                <p style="font-size: 0.85rem;">Choose when and where you want to work</p>
                            </div>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">Build Your Reputation</h4>
                                <p style="font-size: 0.85rem;">Grow your client base through positive reviews</p>
                            </div>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div>
                                <h4 style="color: var(--text); margin-bottom: 6px; font-size: 1rem;">Insurance Protection</h4>
                                <p style="font-size: 0.85rem;">Work with peace of mind with our coverage</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- <button class="btn btn-secondary" style="margin-top: 25px; padding: 10px 25px;">Join as a Worker</button> -->
                    <a href="research_joinAsWorker.php" class="btn btn-secondary">Join as a Worker</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div class="container">
            <h2 class="section-title" style="color: var(--accent);">Success Stories</h2>
            <div class="testimonial-container">
                <div class="testimonial">
                    <div class="testimonial-header">
                        <i class="fas fa-user"></i>
                        <h3 style="color: var(--text); font-size: 1.2rem;">Customer Feedback</h3>
                    </div>
                    <p style="font-size: 0.95rem; line-height: 1.6;">"Trustyhands saved me when my kitchen sink burst on a Sunday! Found a plumber within 20 minutes who fixed everything professionally. The platform is incredibly easy to use and the quality of service exceeded my expectations."</p>
                    <div class="client">
                        <div class="client-avatar">SJ</div>
                        <div class="client-info">
                            <h4>Sarah Johnson</h4>
                            <p>Homeowner in New York</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial">
                    <div class="testimonial-header">
                        <i class="fas fa-tools"></i>
                        <h3 style="color: var(--text); font-size: 1.2rem;">Worker Feedback</h3>
                    </div>
                    <p style="font-size: 0.95rem; line-height: 1.6;">"Since joining Trustyhands, I've doubled my monthly income. The platform connects me with serious clients who value my skills. The payment system is reliable and the support team is always helpful. Best decision I made for my business!"</p>
                    <div class="client">
                        <div class="client-avatar">MC</div>
                        <div class="client-info">
                            <h4>Michael Chen</h4>
                            <p>Electrician & Trustyhands Pro</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial">
                    <div class="testimonial-header">
                        <i class="fas fa-user"></i>
                        <h3 style="color: var(--text); font-size: 1.2rem;">Customer Feedback</h3>
                    </div>
                    <p style="font-size: 0.95rem; line-height: 1.6;">"I've used Trustyhands for multiple services - cleaning, plumbing, and AC repair. Every professional arrived on time, did excellent work, and charged fairly. The app makes it so easy to book and manage services. Highly recommended!"</p>
                    <div class="client">
                        <div class="client-avatar">ER</div>
                        <div class="client-info">
                            <h4>Emma Rodriguez</h4>
                            <p>Business Owner & Regular Customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="container">
            <h2>Ready to Experience Premium Service?</h2>
            <p>Join thousands of satisfied customers and skilled professionals on our platform today.</p>
            <div class="hero-buttons">
    <a href="research_bookWorker.php" class="btn btn-darker">Find a Worker</a>
    <a href="research_joinAsWorker.php" class="btn btn-secondary">Become a Worker</a>
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
                    <p style="font-size: 0.9rem; max-width: 300px; margin-bottom: 18px; color: var(--text-footer);">Connecting customers with trusted local workers for any task, anytime, anywhere.</p>
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
                        <li><a href="AboutPage.html">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="ContactUsPage.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Guidelines</a></li>
                        <li><a href="#">Worker Resources</a></li>
                        <li><a href="#">Customer Resources</a></li>
                        <li><a href="#">Community</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Worker Agreement</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">GDPR Compliance</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2023 Trustyhands. All rights reserved. Premium Service Platform</p>
            </div>
        </div>
    </footer>

    <script>
        // Carousel functionality
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.carousel-slide');
            const indicators = document.querySelectorAll('.indicator');
            let currentSlide = 0;
            let slideInterval;
            
            // Function to show slide
            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                currentSlide = index;
            }
            
            // Auto slide change
            function nextSlide() {
                let next = currentSlide + 1;
                if (next >= slides.length) next = 0;
                showSlide(next);
            }
            
            // Start auto sliding
            function startSlider() {
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Add click events to indicators
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    showSlide(slideIndex);
                    clearInterval(slideInterval);
                    startSlider();
                });
            });
            
            // Initialize the slider
            showSlide(0);
            startSlider();
            
            // Service cards animation
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        });
        // NEW: Profile dropdown toggle
        const profileToggle = document.getElementById('profileToggle');
        const profileDropdown = document.getElementById('profileDropdown');
        
        profileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target) && !profileToggle.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    </script>
</body>
</html>