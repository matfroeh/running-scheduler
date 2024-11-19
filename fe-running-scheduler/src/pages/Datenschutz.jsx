const Datenschutz = () => {
  return (
    <div className="p-6 bg-base-200 text-base-content">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Datenschutzerklärung</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im
            Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <p className="mt-2">
            <strong>[Dein Name/Unternehmen]</strong> <br />
            [Beispiel: Musterstraße 1] <br />
            [12345 Musterstadt, Deutschland] <br />
            E-Mail:{" "}
            <a
              href="mailto:max.mustermann@example.com"
              className="text-primary"
            >
              max.mustermann@example.com
            </a>{" "}
            <br />
            Telefon: +49 123 456789
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. Art der verarbeiteten Daten
          </h2>
          <p>
            Wir verarbeiten die folgenden personenbezogenen Daten:
            <ul className="list-disc list-inside mt-2">
              <li>
                E-Mail-Adresse (bei Registrierung oder Nutzung der
                Demofunktion).
              </li>
            </ul>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Zweck und Rechtsgrundlage der Datenverarbeitung
          </h2>
          <p>
            Die Verarbeitung Ihrer personenbezogenen Daten erfolgt zu den
            folgenden Zwecken und auf Basis der entsprechenden Rechtsgrundlagen:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>
                Bereitstellung eines Nutzerkontos oder der Demofunktion:
              </strong>{" "}
              Die Verarbeitung erfolgt zur Erfüllung eines Vertrags oder
              vorvertraglicher Maßnahmen gemäß Art. 6 Abs. 1 lit. b DSGVO.
            </li>
            <li>
              <strong>Kommunikation und Benachrichtigungen:</strong> Wir
              verwenden Ihre E-Mail-Adresse, um Sie über wichtige Änderungen in
              der App oder technische Probleme zu informieren, auf Grundlage
              Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. Speicherort und Datenempfänger
          </h2>
          <p>
            Ihre Daten werden auf Servern unseres Hosting-Anbieters{" "}
            <strong>[MongoDB Atlas]</strong> gespeichert. Dieser Anbieter
            erfüllt die Anforderungen der DSGVO, und die Server befinden sich
            innerhalb der Europäischen Union.
          </p>
          <p>
            Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn dies
            gesetzlich erlaubt ist oder Sie ausdrücklich eingewilligt haben, z.
            B. für:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Versand von E-Mails (z. B. durch [Mailgun/AWS SES]).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Dauer der Speicherung
          </h2>
          <p>
            Wir speichern Ihre personenbezogenen Daten:
            <ul className="list-disc list-inside mt-2">
              <li>solange Sie ein aktives Konto bei uns haben;</li>
              <li>
                oder solange dies zur Erfüllung gesetzlicher
                Aufbewahrungspflichten erforderlich ist.
              </li>
            </ul>
          </p>
          <p>
            Wenn Sie Ihr Konto löschen oder der Verarbeitung widersprechen,
            werden Ihre Daten umgehend gelöscht, sofern keine gesetzlichen
            Aufbewahrungsfristen bestehen.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Ihre Rechte</h2>
          <p>
            Sie haben das Recht:
            <ul className="list-disc list-inside mt-2">
              <li>
                Auskunft über die bei uns gespeicherten personenbezogenen Daten
                zu verlangen (Art. 15 DSGVO).
              </li>
              <li>
                die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO).
              </li>
              <li>
                die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO), sofern
                keine gesetzlichen Pflichten entgegenstehen.
              </li>
              <li>
                die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO).
              </li>
              <li>
                der Verarbeitung Ihrer Daten zu widersprechen (Art. 21 DSGVO).
              </li>
              <li>
                Ihre Daten in einem strukturierten, gängigen Format zu erhalten
                oder an einen Dritten übertragen zu lassen (Art. 20 DSGVO).
              </li>
            </ul>
          </p>
          <p>
            Zur Ausübung Ihrer Rechte können Sie uns jederzeit unter{" "}
            <a
              href="mailto:max.mustermann@example.com"
              className="text-primary"
            >
              max.mustermann@example.com
            </a>{" "}
            kontaktieren.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            7. Widerruf der Einwilligung
          </h2>
          <p>
            Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die
            Zukunft widerrufen, z. B. durch eine Nachricht an{" "}
            <a
              href="mailto:max.mustermann@example.com"
              className="text-primary"
            >
              max.mustermann@example.com
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            8. Beschwerderecht bei einer Aufsichtsbehörde
          </h2>
          <p>
            Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen
            die DSGVO verstößt, können Sie sich bei der zuständigen
            Datenschutzaufsichtsbehörde beschweren. In Deutschland ist dies z.
            B.:
          </p>
          <p>
            <strong>
              Der Landesbeauftragte für Datenschutz und Informationsfreiheit
              [dein Bundesland]
            </strong>
            Adresse und Kontaktdaten je nach Bundesland.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Sicherheit</h2>
          <p>
            Wir setzen technische und organisatorische Maßnahmen ein, um Ihre
            Daten vor Verlust, Missbrauch oder unbefugtem Zugriff zu schützen.
            Dazu gehören verschlüsselte Übertragungen (z. B. SSL/TLS).
          </p>
        </section>
      </div>
    </div>
  );
};

export default Datenschutz;
