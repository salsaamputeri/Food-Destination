const DrawerInitiator = {
  init({ button, drawer, content }) {
    const navigations = document.querySelectorAll('#navigationDrawer a');
    navigations.forEach((nav) => {
      nav.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });

    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
