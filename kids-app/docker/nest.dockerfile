# === Builder-Phase ===
# Verwendet das offizielle Node.js LTS Alpine Image als Basis für die Build-Phase.
FROM node:lts-alpine AS builder

# Definiert ein Build-Argument 'APP', das den Namen der zu bauenden Anwendung enthält (z.B. 'backend' oder 'bff').
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

# Führt den Build-Befehl für die angegebene Anwendung aus.
# Dies kompiliert den TypeScript-Code in JavaScript und bereitet die Anwendung für die Produktion vor.
RUN npm run build:${APP}

# === Produktion-Phase ===
# Verwendet das offizielle Node.js LTS Alpine Image als Basis für die Produktions-Phase.
# Dies ist eine schlankere und sicherere Basis für die Laufzeitumgebung.
FROM node:lts-alpine AS production

# Definiert ein Build-Argument 'APP', das den Namen der Anwendung enthält.
ARG APP

# Setzt das Arbeitsverzeichnis im Container auf /app.
WORKDIR /app

# Kopiert die gebauten Anwendungsdateien aus der 'builder'-Phase
# in das Arbeitsverzeichnis der Produktions-Phase.
COPY --from=builder /app/dist/apps/${APP} .

# Installiert nur die Produktionsabhängigkeiten (ohne Entwicklungsabhängigkeiten).
# Dies reduziert die Größe des finalen Images.
RUN npm install --omit=dev

# Definiert den Befehl, der ausgeführt wird, wenn der Container startet.
# Startet die kompilierte Node.js-Anwendung.
CMD ["node", "main.js"]
