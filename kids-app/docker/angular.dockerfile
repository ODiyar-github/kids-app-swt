# === Builder-Phase ===
# Verwendet das offizielle Node.js LTS Alpine Image als Basis für die Build-Phase.
FROM node:lts-alpine AS builder

# Definiert ein Build-Argument 'APP', das den Namen der zu bauenden Anwendung enthält (z.B. 'frontend').
ARG APP

# Setzt das Arbeitsverzeichnis im Container auf /app.
WORKDIR /app

# Kopiert die Paket-Definitionsdateien (package.json, package-lock.json/yarn.lock) in das Arbeitsverzeichnis.
COPY package*.json ./
# Kopiert die Nx-Konfigurationsdatei.
COPY nx.json ./
# Kopiert die Basis-TypeScript-Konfigurationsdatei.
COPY tsconfig.base.json ./

# Führt 'npm install' aus, um alle Abhängigkeiten zu installieren.
RUN npm install

# Kopiert den gesamten restlichen Quellcode in das Arbeitsverzeichnis.
COPY . .

# Führt den Nx-Build-Befehl für die angegebene Anwendung aus.
# Dies erstellt die produktionsbereiten Artefakte der Angular-Anwendung.
RUN npx nx build ${APP}

# === Laufzeit-Phase ===
# Verwendet das Nginx-Unprivileged-Image als Basis für die Laufzeit-Phase.
# Dieses Image läuft als nicht-privilegierter Benutzer und erhöht die Sicherheit.
FROM nginxinc/nginx-unprivileged

# Definiert ein Build-Argument 'APP' mit einem Standardwert 'frontend'.
# Dies wird verwendet, um den Pfad zu den Nginx-Konfigurationsdateien zu bestimmen.
ARG APP=frontend

# Wechselt zum Root-Benutzer, um Dateisystemoperationen ausführen zu können.
USER root

# Setzt das Arbeitsverzeichnis im Container auf /app.
WORKDIR /app

# Kopiert die Nginx-Standardkonfigurationsdatei der Anwendung in das Nginx-Konfigurationsverzeichnis.
# Diese Datei definiert, wie Nginx die Angular-Anwendung ausliefert.
COPY apps/${APP}/nginx/default.conf /etc/nginx/conf.d/default.conf

# Entfernt alle Standard-HTML-Dateien, die im Nginx-Image enthalten sein könnten.
RUN rm -rf /usr/share/nginx/html/*

# Kopiert die gebauten Angular-Anwendungsdateien aus der 'builder'-Phase
# in das Nginx-Webserver-Verzeichnis.
COPY --from=builder /app/dist/apps/${APP}/browser /usr/share/nginx/html/

# Exponiert Port 8080. Dies ist der Port, auf dem Nginx im Container lauschen wird.
EXPOSE 8080

# Definiert den Befehl, der ausgeführt wird, wenn der Container startet.
# Dieser Befehl ersetzt Umgebungsvariablen in einer JavaScript-Datei (für dynamische Konfiguration)
# und startet dann Nginx im Vordergrund.
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
