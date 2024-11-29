import ErrorResponse from "../utils/ErrorResponse.js";

const demoProtectionMiddleware = (req, res, next) => {

  // Check if the user logged in is in demo mode
  if (req.userRole === "demo") {
    console.log("User is in demo mode");

    // List of restricted methods
    const restrictedMethods = ["POST", "PUT", "PATCH", "DELETE"];

    if (restrictedMethods.includes(req.method)) {
      throw new ErrorResponse(
        "Demo user cannot modify data. Data will be restored on reload. Create an account to access all functionality.",
        403
      );
    }
  }
  next(); // Continue to the next middleware or route handler
};

export default demoProtectionMiddleware;
