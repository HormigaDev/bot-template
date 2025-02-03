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

> Este directorio contiene el archivo `db.ts` inicialmente, que es el archivo que contiene la configuración de la base de datos (por defecto se usa MongoDB).

### src/events

> Este directorio contiene los archivos que manejan los diferentes eventos del bot (ready, interaction, message, etc...). Es aquí donde puedes alterar el comportamiento por defecto del bot al recibir un comando o recibir un mensaje nuevo en algún canal. Tú decides.

### src/handlers

> Este directorio inicialmente tiene los manejadores de eventos, comandos de barra (slash) y comandos de texto (raw commands).

### src/types

> Este directorio contiene algunos tipos personalizados utilizados en todo el código. Todos están centralizados allí.

### src/bot.ts

> Este archivo es el que inicializa el cliente del bot con las configuraciones como los intentos.

### src/server.ts

> Este es el archivo que levanta el servidor para que el bot pueda operar.

### src/index.ts

> Es el archivo de entrada principal del bot.

## Estructura de los comandos

### Comandos Raw (comandos de texto)

Los comando de texto (raw) tienen propiedades con los cuales podrás cambiar su comportamiento y alcance.

```typescript
type RawCommand = {
    name: string;
    alias: string[];
    description?: string;
    usage?: string;
    anyPermissions?: bigint[];
    requiredPermissions?: bigint[];
    adminOnly?: boolean;
    ownerOnly?: boolean;
    developerOnly?: boolean;
    execute: (bot: Bot, message: Message, args: string[]) => Promise<void>;
};
```

> El `?` después del nombre indica que la propiedad es opcional.

#### Propiedades del comando

-   `name`: El nombre del comando (obligatorio)
-   `alias`: La abreviación del comando (obligatorio, si no tiene dejar el array vacío)
-   `execute`: La función que se ejecuta al llamar el comando (obligatoria). Esta función recibe 3 parámetros: **bot**, que es la entidad del cliente de Discord con algunas peculiaridades, **message**, que es el objeto del mensaje que se envió desde el servidor y **args** que es una lista de ninguno o más argumentos informados al utilizar el comando.
-   `description`: La descripción del comando (opcional)
-   `usage`: texto que informa como debería usarse el comando. Al informar este texto se pueden usar los marcadores **$1** y **$2** que corresponden al prefijo del bot y al nombre del comando respectivamente. Es muy util cuando se implementa el comando de **!help**. (opcional)
-   `anyPermissions`: Se refiere a que el usuario debe tener **al menos** uno de los permisos indicados. (opcional)
-   `requiredPermissions`: Lista de permisos para usar el comando, el usuario debe poseer **todos** los permisos indicados. (opcional)
-   `adminOnly`: Quiere decir que solo los usuarios con permiso de administrador podrán usar este comando. (opcional)
-   `ownerOnly`: Quiere decir que solo el propietario del servidor podrá utilizar este comando. (opcional)
-   `developerOnly`: Quiere decir que solo los usuarios que se encuentren en la lista de IDs permitidos podrán usar este comando. Es muy útil cuando se está desarrollando un comando nuevo y se requiere probarlo sin que otros usuarios puedan utilizarlo. (Aunque para eso sería mejor tener un bot de prueba.) (opcional)

### Comandos Slash

Estos comandos se gestionan por medio de la API de Discord así que ya tienen su estructura construida.
Si necesitas aprender más sobre estos comandos, puedes unirte a nuestra [Comunidad de Discord](https://discord.gg/Rx5Db2WBF3) y solicitar ayuda en los canales designados.
O puedes visitar nuestro [Blog](https://blog.hormiga.dev) para encontrar recursos más detallados.

## Base de datos

La conexión a la base de datos se encuentra en el archivo `src/database/db.ts` en el se encuentra exportada la función que inicializa la base de datos, se usa mongoose para la conexión, si necesitas saber mas sobre como funciona este framework puedes ir a la [Página oficial de Mongoose](https://mongoosejs.com/)

los modelos están configurados en `src/database/models`;

> NOTA: esta base de datos por defecto no está siendo utilizada en ninguna parte del código para evitar la dependencia innecesaria si no se desea utilizar MongoDB, en el caso de querer utilizarlo pudes ir al [Post](https://blog.hormiga.dev/posts/404) donde explicamos como integrarlo en la plantilla del bot para diversos fines, siendo el más común, establecer prefijos por servidor.

Si necesitas ayuda con cualquier cosa sobre esta plantilla, no dudes en unirte a nuestra [Comunidad de Discord](https://discord.gg/Rx5Db2WBF3), Ahí siempre estamos dispuestos a ayudarte siempre que esté en nuestras posibilidades.
