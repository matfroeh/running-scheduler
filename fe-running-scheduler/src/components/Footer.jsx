import cn from "../utils/cn.js";

const Footer = ({ className }) => {
  return (
    <footer
      className={cn(
        "grid grid-cols-2 justify-start text-xs bg-gray-800 text-gray-200 mb-1",
        className
      )}
    >
      <div className="ml-4">
        <p className="mt-2">
          <strong>Impressum:</strong>
        </p>
        <p>
          Verantwortlich: Matthias Fröhlich <br />
          E-Mail:{" "}
          <a
            href="mailto:froehlich_matthias@yahoo.com"
            className="text-blue-400 underline"
          >
            froehlich_matthias@yahoo.com
          </a>
        </p>
        <p className="mt-2">
          <a href="/datenschutz" className="text-blue-400 underline">
            Datenschutzerklärung
          </a>{" "}
        </p>
      </div>
      <div className="">
        <p className="mt-2">
          <strong>Haftungsausschluss:</strong>
          <br />
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
          für die Inhalte externer Links. <br />
          Für den Inhalt der verlinkten Seiten sind ausschließlich deren
          Betreiber verantwortlich.
        </p>
        <p className="mt-4">
          © {new Date().getFullYear()} Matthias Fröhlich. Alle Rechte
          vorbehalten.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
