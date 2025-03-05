window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const protectedLinks = document.querySelectorAll('.protected-link');

    // If the user is logged in, hide the login button and show the logout button
    if (isLoggedIn) {
        loginButton.style.display = "none"; // Hide login button
        logoutButton.style.display = "block"; // Show logout button
    } else {
        // Protect the links by redirecting to the login page
        protectedLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior
                window.location.href = '/page/login.html'; // Redirect to login page
            });
        });
    }

    // Handle logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn'); // Remove the logged-in status
        location.reload(); // Reload the page
    });
};