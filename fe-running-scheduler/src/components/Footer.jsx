import cn from "../utils/cn.js";
const Footer = ({ className }) => {
  return (
    <footer
      className={cn(
        "p-2 grid grid-cols-2 justify-start text-xs bg-gray-800 text-gray-200 mb-1",
        className
      )}
    >
      <div>
        <p className="mt-2">
          <a href="/impressum" className="text-blue-400 underline">
            Impressum / Legal Notice
          </a>
          <div className="flex">
            <p className="mt-2">
              <a href="/datenschutz" className="text-blue-400 underline">
                Datenschutzerklärung
              </a>{" "}
            </p>
            <p className="mt-2 mx-2">/</p>
            <p className="mt-2">
              <a
                href="https://www.freeprivacypolicy.com/live/3003514e-7840-4368-b3df-29d008ecbf4b"
                className="text-blue-400 underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </p>
      </div>
      <div className="flex">
        <p className="mt-4">
          © {new Date().getFullYear()} Matthias Fröhlich. Alle Rechte
          vorbehalten.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
