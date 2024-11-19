const Footer = () => {
  return (
    <footer className="ml-2 flex flex-col justify-start bg-gray-800 text-gray-200">
      <div className="text-left text-sm">
        <div>
          <p className="mt-4">
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
        </div>
        <div>
          <p className="mt-4">
            <strong>Haftungsausschluss:</strong>
            <p>
              {" "}
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
              Haftung für die Inhalte externer Links. <br />
              Für den Inhalt der verlinkten Seiten sind ausschließlich deren
              Betreiber verantwortlich.
            </p>
          </p>
          {/* <p className="mt-4">
            <a href="/datenschutz" className="text-blue-400 underline">
              Datenschutzerklärung
            </a>{" "}
          </p> */}
          <p className="mt-6 mb-2 text-sm">
            © {new Date().getFullYear()} Matthias Fröhlich. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
