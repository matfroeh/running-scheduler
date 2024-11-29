// demoProtectionMiddleware.js
const demoProtectionMiddleware = (req, res, next) => {
    console.log("middleware is running");
    
    // Check if the user is logged in and if they are the demo user
    if (req.user && req.user.role === 'demo') {
      // List of restricted methods
      const restrictedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  
      if (restrictedMethods.includes(req.method)) {
        return res.status(403).json({
          message: "Demo user cannot modify data. Log in with a regular account to access this functionality."
        });
      }
    }
    next();  // Continue to the next middleware or route handler
  };
  
export default demoProtectionMiddleware;
  