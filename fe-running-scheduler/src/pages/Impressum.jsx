const Impressum = () => {
  return (
    <div className="p-6 bg-base-200 text-base-content">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Impressum</h1>

        <section className="mb-6">
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
        </section>
        <section className="mb-6">
          <p className="mt-2">
            <strong>Haftungsausschluss:</strong>
            <br />
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Inhalte externer Links. <br />
            Für den Inhalt der verlinkten Seiten sind ausschließlich deren
            Betreiber verantwortlich.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} Matthias Fröhlich. Alle Rechte
            vorbehalten.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Impressum;
