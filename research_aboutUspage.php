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
    <title>About Trustyhands | Premium Service Platform</title>
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
        
        /* Hero Banner for About */
        .about-hero {
            background: linear-gradient(rgba(40, 54, 24, 0.85), rgba(40, 54, 24, 0.85)), 
                        url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
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
        
        /* Section Styles */
        .section {
            padding: 40px 0; /* Reduced padding */
        }
        
        .section-title {
            text-align: center;
            font-size: 1.8rem;
            margin-bottom: 25px; /* Reduced margin */
            color: var(--primary);
            position: relative;
        }
        
        .section-title::after {
            content: '';
            display: block;
            width: 70px;
            height: 3px;
            background: var(--accent);
            margin: 10px auto 0; /* Reduced margin */
            border-radius: 3px;
        }
        
        /* Our Story Section */
        .story-content {
            display: flex;
            gap: 30px; /* Reduced gap */
            align-items: center;
            margin-bottom: 30px; /* Reduced margin */
        }
        
        .story-text {
            flex: 1;
        }
        
        .story-image {
            flex: 1;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: var(--shadow);
            height: 360px; /* Reduced height */
            background: linear-gradient(rgba(40, 54, 24, 0.85), rgba(40, 54, 24, 0.85)),
            url('https://img.freepik.com/premium-vector/three-women-are-animatedly-discussing-together-sharing-smiles-expressing-their-thoughts-with-enthusiasm-women-talking-customizable-disproportionate-illustration_538213-138696.jpg') center/cover no-repeat;
        }
        
        /* Founders Section */
        .founders-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px; /* Reduced gap */
            margin-top: 20px; /* Reduced margin */
        }
        
        .founder-card {
            background: var(--white);
            border-radius: 14px;
            padding: 25px; /* Reduced padding */
            text-align: center;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }
        
        .founder-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }
        
        .founder-img {
            width: 130px; /* Reduced size */
            height: 130px; /* Reduced size */
            border-radius: 50%;
            margin: 0 auto 15px; /* Reduced margin */
            object-fit: cover;
            border: 4px solid var(--light-background); /* Reduced border */
        }
        
        .founder-name {
            font-size: 1.3rem; /* Slightly smaller */
            color: var(--primary);
            margin-bottom: 6px; /* Reduced margin */
        }
        
        .founder-role {
            color: var(--accent);
            font-weight: 500;
            margin-bottom: 12px; /* Reduced margin */
        }
        
        /* How It Works Section */
        .process-steps {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px; /* Reduced gap */
            margin-top: 30px; /* Reduced margin */
        }
        
        .process-step {
            background: rgba(96, 108, 56, 0.05);
            border-radius: 14px;
            padding: 25px; /* Reduced padding */
            width: 23%;
            text-align: center;
            box-shadow: var(--shadow);
            transition: var(--transition);
            position: relative;
        }
        
        .step-number {
            position: absolute;
            top: -12px; /* Adjusted position */
            left: 50%;
            transform: translateX(-50%);
            width: 35px; /* Smaller size */
            height: 35px; /* Smaller size */
            background: var(--primary);
            color: var(--white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem; /* Slightly smaller */
        }
        
        .step-icon {
            font-size: 2.2rem; /* Slightly smaller */
            color: var(--primary);
            margin-bottom: 15px; /* Reduced margin */
        }
        
        .step-title {
            font-size: 1.1rem; /* Slightly smaller */
            margin-bottom: 12px; /* Reduced margin */
            color: var(--text);
            font-weight: 600;
        }
        
        /* Technology Stack Section */
        .tech-stack {
            background: var(--light-gray);
        }
        
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px; /* Reduced gap */
            margin-top: 25px; /* Reduced margin */
        }
        
        .tech-card {
            background: var(--white);
            border-radius: 10px;
            padding: 20px 15px; /* Reduced padding */
            text-align: center;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }
        
        .tech-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        .tech-icon {
            font-size: 2.3rem; /* Slightly smaller */
            color: var(--primary);
            margin-bottom: 12px; /* Reduced margin */
        }
        
        .tech-name {
            font-size: 1.05rem; /* Slightly smaller */
            font-weight: 600;
            margin-bottom: 8px; /* Reduced margin */
        }
        
        /* Work With Us Section */
        .work-with-us {
            background: linear-gradient(135deg, var(--primary), #728c45);
            color: var(--white);
            text-align: center;
            padding: 40px 0; /* Reduced padding */
            position: relative;
            overflow: hidden;
        }
        
        .work-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .work-options {
            display: flex;
            justify-content: center;
            gap: 25px; /* Reduced gap */
            margin-top: 30px; /* Reduced margin */
            flex-wrap: wrap;
        }
        
        .work-option {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 14px;
            padding: 25px; /* Reduced padding */
            width: 300px;
            text-align: center;
            transition: var(--transition);
            backdrop-filter: blur(5px);
        }
        
        .work-option:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-8px);
        }
        
        .work-icon {
            font-size: 2.2rem; /* Slightly smaller */
            margin-bottom: 15px; /* Reduced margin */
            color: var(--earth-yellow);
        }
        
        /* Footer */
        footer {
            background-color: var(--dark-background);
            padding: 40px 0 15px; /* Reduced padding */
            position: relative;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 25px; /* Reduced gap */
            margin-bottom: 30px; /* Reduced margin */
            position: relative;
            z-index: 1;
        }
        
        .footer-column h3 {
            font-size: 1.2rem;
            margin-bottom: 15px; /* Reduced margin */
            color: var(--earth-yellow);
        }
        
        .footer-column ul {
            list-style: none;
        }
        
        .footer-column ul li {
            margin-bottom: 8px; /* Reduced margin */
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
            margin-top: 15px; /* Reduced margin */
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
            
            .story-content {
                flex-direction: column;
            }
            
            .story-image {
                width: 100%;
                margin-top: 20px; /* Reduced margin */
                height: 320px; /* Reduced height */
            }
            
            .process-step {
                width: 48%;
                margin-bottom: 20px; /* Reduced margin */
            }
        }
        
        @media (max-width: 768px) {
            .about-hero h1 {
                font-size: 2.2rem;
            }
            
            .about-hero p {
                font-size: 1rem;
            }
            
            .process-step {
                width: 100%;
            }
            
            .founders-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 480px) {
            .about-hero {
                padding: 50px 0; /* Reduced padding */
            }
            
            .about-hero h1 {
                font-size: 1.8rem;
            }
            
            .section-title {
                font-size: 1.6rem;
            }
            
            .work-options {
                flex-direction: column;
                align-items: center;
                gap: 20px; /* Reduced gap */
            }
            
            .work-option {
                width: 100%;
            }
        }
        a{
            text-decoration:none;
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
                <li><a href="research_homepage.php">Home</a></li>
                <li><a href="research_aboutUspage.php" class="active">About Us</a></li>
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

    <!-- About Hero Banner -->
    <section class="about-hero">
        <div class="container">
            <h1>About Trustyhands</h1>
            <p>Connecting skilled workers with people in need since 2023</p>
        </div>
    </section>

    <!-- Our Story Section -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Our Story</h2>
            <div class="story-content">
                <div class="story-text">
                    <p>In India, finding reliable skilled workers like plumbers, electricians, cleaners, and construction workers at the right time has always been a challenge. Most people rely on neighbors, WhatsApp groups, or unverified contacts, which is slow and unreliable. At the same time, many skilled workers struggle to find regular employment, often depending on word of mouth or waiting at labor points hoping for work.</p>
                    <br>
                    <p>Trustyhands was born to solve this dual problem. Founded in 2023 by three passionate entrepreneurs - Shruthi Deepika, Durga Sravanthi, and Khyathi Sree - our platform instantly connects users with nearby verified workers, making the process faster, safer, and more convenient for everyone involved.</p>
                    <br>
                    <p>Today, Trustyhands has grown to become one of India's leading service platforms, connecting thousands of skilled workers with customers across multiple cities. Our mission is to empower both workers and customers through technology, creating opportunities and solving everyday problems.</p>
                </div>
                <div class="story-image"></div>
            </div>
        </div>
    </section>

    <!-- Founders Section -->
    <section class="section" style="background-color: rgba(221, 161, 94, 0.05);">
        <div class="container">
            <h2 class="section-title">Meet Our Founders</h2>
            <div class="founders-grid">
                <div class="founder-card">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80" alt="Shruthi Deepika" class="founder-img">
                    <h3 class="founder-name">Shruthi Deepika</h3>
                    <p class="founder-role">CEO & Co-Founder</p>
                    <p>With a background in technology and social entrepreneurship, Shruthi leads our vision to transform India's service industry.</p>
                </div>
                <div class="founder-card">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80" alt="Durga Sravanthi" class="founder-img">
                    <h3 class="founder-name">Durga Sravanthi</h3>
                    <p class="founder-role">CEO & Co-Founder</p>
                    <p>Durga brings technical expertise and a passion for creating user-friendly platforms that solve real-world problems.</p>
                </div>
                <div class="founder-card">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80" alt="Khyathi Sree" class="founder-img">
                    <h3 class="founder-name">Khyathi Sree</h3>
                    <p class="founder-role">CEO & Co-Founder</p>
                    <p>Khyathi focuses on operations and community building, ensuring both workers and customers have exceptional experiences.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">How Trustyhands Works</h2>
            <p style="text-align: center; max-width: 800px; margin: 0 auto 30px;">Our platform simplifies the process of finding skilled workers while creating opportunities for service providers</p>
            
            <div class="process-steps">
                <div class="process-step">
                    <div class="step-number">1</div>
                    <div class="step-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <h3 class="step-title">Create Account</h3>
                    <p>Users sign up as customers or workers through our simple onboarding process</p>
                </div>
                <div class="process-step">
                    <div class="step-number">2</div>
                    <div class="step-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 class="step-title">Find or Offer Services</h3>
                    <p>Customers find skilled workers nearby. Workers offer their services and set availability</p>
                </div>
                <div class="process-step">
                    <div class="step-number">3</div>
                    <div class="step-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h3 class="step-title">Connect & Agree</h3>
                    <p>Parties connect directly, agree on terms, and confirm the job</p>
                </div>
                <div class="process-step">
                    <div class="step-number">4</div>
                    <div class="step-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 class="step-title">Complete & Review</h3>
                    <p>Job is completed, payment is processed securely, and both parties leave reviews</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Work With Us Section -->
    <section class="work-with-us">
        <div class="container">
            <div class="work-content">
                <h2 style="font-size: 2.2rem; margin-bottom: 15px;">Work With Trustyhands</h2>
                <p style="font-size: 1.1rem; max-width: 700px; margin: 0 auto 20px;">Join our mission to transform India's service industry and create opportunities for millions</p>
                
                <div class="work-options">
                    <div class="work-option">
                        <div class="work-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <h3>Join Our Team</h3>
                        <p>We're always looking for talented individuals who share our passion for innovation and social impact.</p>
                        <button class="btn btn-secondary" style="margin-top: 15px; padding: 8px 20px;">View Openings</button>
                    </div>
                    <div class="work-option">
                        <div class="work-icon">
                            <i class="fas fa-tools"></i>
                        </div>
                        <h3>Become a Worker</h3>
                        <p>Join our platform as a skilled professional and access thousands of job opportunities in your area.</p>
                        <button class="btn btn-primary" style="margin-top: 15px; padding: 8px 20px;">Sign Up Now</button>
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
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Contact Us</a></li>
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
        // Simple navigation active state
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('nav a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
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