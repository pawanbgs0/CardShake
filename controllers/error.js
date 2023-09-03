exports.get404 = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404', isAuthenticated: isLoggedIn });
  };

  exports.csrfError = (err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
      // Render the CSRF error page
      return res.status(403).render('500', {
        pageTitle: 'Forbidden: Invalid CSRF Token',
        path: '/csrf-error',
        isAuthenticated: req.session.isLoggedIn
      });
    }
    // Handle other errors (e.g., 500 Internal Server Error) here
    res.status(500).render('500', {
      pageTitle: 'Something went Wrong',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn,
    });
  };