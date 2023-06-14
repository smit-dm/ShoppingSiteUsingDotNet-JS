"use strict";

const navbar = document.getElementById("navbar");

function logout () {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    location.reload();
}

const navbarComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let html;
  if (user) {
    html = `
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">
        <img
            src="images/general/Gerald-G-Dog-Simple-Drawing-3.svg"
            alt="Logo"
            height="52"
            class="d-inline-block"
        />
            Pets & More
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="index.html">
                        Products
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="cart.html">
                        Cart
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="changeProfile.html">
                    Account
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onclick="logout();" href="#">
                    Logout
                    </a>
                </li>                
            </ul>
        </div>
        <p class="mb-0">${user.name}</p>
    </div>
    `;
  } else {
    html = `
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">
        <img
            src="images/general/Gerald-G-Dog-Simple-Drawing-3.svg"
            alt="Logo"
            height="52"
            class="d-inline-block"
        />
        Pets & More
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
            <a class="nav-link" aria-current="page" href="index.html">
                Products
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="cart.html">
                Cart
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="login.html">
                Login
            </a>
            </li>
        </ul>
        </div>
        <p class="mb-0">Anonymous</p>
    </div>
    `;
  }
  return html;
};

navbar.innerHTML = navbarComponent();
