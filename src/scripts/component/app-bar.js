class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <style>
          .app-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 1.3rem 8%;
            display: flex;
            justify-content: space-between;
            z-index: 100;
          }
          
          .app-bar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.324);
            backdrop-filter: blur(8px);
            z-index: -1;
          }
           
          .app-bar .app-bar__menu button {
            background-color: transparent;
            border: none;
            font-size: 18px;
            padding: 8px;
            cursor: pointer;
            color: #fff; 
          }
          
          .app-bar .app-bar__brand h1 {
            font-size: 1.6rem;
            color: #fff;
            text-decoration: none;
            font-weight: 700;
          }
        
         .app-bar .app-bar__menu {
          display: none;
        }
        
        .app-bar .app-bar__navigation {
          position:fixed;
          top: 0;
          right: 0;
          width: 50%; 
          max-width: 400px; 
          width: 100%;
          background-color: transparent;
          padding: 1.5rem 4rem;
        }
        
        .app-bar .app-bar__navigation a {
          font-size: 1.1rem;
          color: #fff;
          text-decoration: none;
          display: inline-block;
          padding: 5px;
          min-width: 44px;
          min-height: 44px;
        }
        
        .app-bar .app-bar__navigation a:hover {
          color: rgb(255, 255, 255);
          text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.938);
        }
          
        .app-bar .app-bar__navigation.open {
          transform: translateX(-100%);
        } 
        @media (max-width: 703px) {
            .app-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                padding: 1.3rem 8%;
                display: flex;
                justify-content: space-between;
                z-index: 100;
              }
              
            .app-bar::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.324);
                backdrop-filter: blur(8px);
                z-index: -1;
            }
            
            .app-bar .app-bar__menu {
                display: flex;
                align-items: center;
            }
            
            .app-bar .app-bar__menu button {
                background-color: transparent;
                border: none;
                font-size: 18px;
                padding: 8px;
                cursor: pointer;
                color: #fff; 
            }
            
            .app-bar .app-bar__brand h1 {
                font-size: 1.6rem;
                color: #fff;
                text-decoration: none;
                font-weight: 700;
            }
            
            .app-bar .app-bar__navigation {
                position: absolute;
                top: 100%;
                left: 100%;
                width: 100%;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.5s ease-in-out, transform 0.5s ease-in-out;
                background-color: rgba(0, 0, 0, 0.192);
                backdrop-filter: blur(2px);
                box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.324);
                display: flex;
                flex-direction: column;
                justify-content: center;
                z-index: 99;
            }
            
            .app-bar .app-bar__navigation a {
              display: block;
              font-size: 1rem;
              text-align: center;
              padding: 1rem;
              transition: .5s ease;
          }
            
            .app-bar .app-bar__navigation.open {
              height: 13rem;
              max-height: 100vh;
            }
            
            .app-bar .app-bar__navigation.open a {
                transform: translateY(0);
                opacity: 1;
                transition-delay: calc(.15s * var(--i));
            }

            @media (max-width: 589px) {
                .app-bar .app-bar__brand h1 {
                  font-size: 1.3rem;
                  color: #fff;
                  text-decoration: none;
                  font-weight: 700;
                }
          </style>
          <header class="app-bar">
          <div class="app-bar__brand">
              <h1>Food Destination</h1>
          </div>
          <div class="app-bar__menu">
            <button id="hamburgerButton">☰</button>
          </div>
          <nav id="navigationDrawer" class="app-bar__navigation">
          <div class="dropdown">
              <div class="dropdown-content">
                <a href="#/home" style="--i:0;" >Home</a>
                <a href="#/favorite" style="--i:1;" >Favorite</a>
                <a href="https://www.linkedin.com/in/salsamputeri" style="--i:2;" target="_blank" rel="noopener noreferrer">About Us</a>
              </div>
          </div>
          </nav>
        </header>
        `;
  }
}

customElements.define('app-bar', AppBar);
