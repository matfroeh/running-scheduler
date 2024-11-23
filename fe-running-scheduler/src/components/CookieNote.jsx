import CookieConsent from "react-cookie-consent";

const CookieNote = () => {
  return (
    <CookieConsent
      debug={false}
      location="top"
      buttonText="Allow functional cookies."
      expires={7}
    >
      <div className="">
        This website uses functional cookies to enhance the user experience.
        Particularly, an authentication cookie will be set to verify your
        credentials and keep you logged in.
      </div>
    </CookieConsent>
  );
};

export default CookieNote;
