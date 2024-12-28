# BOT-TEMPLATE

Es un pequeño proyecto que provee la una plantilla simple de un bot de discord

## Como empezar:

-   Primero clona el repositorio:

```bash
git clone git@github.com:HormigaDev/bot-template.git
cd bot-template
```

-   Instala las dependencias:

```bash
npm install
```

-   Necesitas copiar el archivo `.env.template` a `.env`, ahí puedes definir tus variables de entorno, o si usas las variables de entorno propias del sistema puedes desconsiderar esto.

-   Para probar que el bot funciona ejecuta el siguiente comando:

```bash
npm run dev
```

-   Para construir el proyecto usa el siguiente comando:

```bash
npm run build
```

-   Luego, para iniciarlo en producción usa:

```bash
npm run start
```

## Directorios y Archivos

### src/commands

> El directorio `commands` es donde se encuentran los comandos del bot, tanto los comandos de texto (raw commands) como los comandos de barra (slash).
> Cada carpeta dentro de `commands` tiene un archivo `.template`, este archivo contiene una plantilla de la estructura que debe tener cada comando.

### src/database

> Este directorio contiene el archivo `db.ts` inicialmente, que es el archivo que contiene la configuración de la base de datos (por defecto se usa MongoDB Atlas).

### src/events

> Este directorio contiene los archivos que manejan los diferentes eventos del bot (ready, interaction, message, etc...). Es aquí donde puedes alterar el comportamiento por defecto del bot al recibir un comando o recibir un mensaje nuevo en algún canal. Tú decides.

### src/handlers

> Este directorio inicialmente tiene los manejadores de eventos, comandos de barra (slash) y comandos de texto (raw commands).

### src/interfaces

> Este directorio contiene algunos tipos personalizados utilizados en todo el código. Todos están centralizados allí.

### src/bot.ts

> Este archivo es el que inicializa el cliente del bot con las configuraciones como los intentos.

### src/server.ts

> Este es el archivo que levanta el servidor para que el bot pueda operar.

### src/index.ts

> Es el archivo de entrada principal del bot.
