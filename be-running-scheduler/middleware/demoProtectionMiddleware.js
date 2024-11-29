// demoProtectionMiddleware.js
const demoProtectionMiddleware = (req, res, next) => {
    console.log("middleware is running");
    
    // Check if the user logged in is in demo mode
    if (req.userRole === 'demo') {
      // List of restricted methods
      const restrictedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  
      if (restrictedMethods.includes(req.method)) {
        return res.status(403).json({
          message: "Demo user cannot modify data. Create an account to access all functionality."
        });
      }
    }
    next();  // Continue to the next middleware or route handler
  };
  
export default demoProtectionMiddleware;
  