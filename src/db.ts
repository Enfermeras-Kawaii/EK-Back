import { Sequelize } from 'sequelize'

// Configuración de la base de datos
const username = process.env.DB_USERNAME || 'root'
const password = process.env.DB_PASSWORD || 'n0m3l0'
const database = process.env.DATABASE || 'prueba_enfermeras'
const host = process.env.DB_HOST
const port = process.env.DB_PORT !== undefined ? parseInt(process.env.DB_PORT, 10) : 3306

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize({
    dialect: 'mysql',
    database,
    username,
    password,
    host,
    port,
    logging: false,
    pool: {
        max: 5, // número máximo de conexiones en el pool
        min: 0, // número mínimo de conexiones en el pool
        acquire: 30000, // tiempo máximo, en milisegundos, que el pool intentará obtener la conexión antes de lanzar un error
        idle: 10000 // tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
    }
})

// Función para sincronizar las tablas
export async function syncTables(): Promise<void> {
    try {
        await sequelize.sync()
        console.log(">> Tablas sincronizadas")
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Ocurrió un error al sincronizar las tablas: ${error.message}`)
        } else {
            console.error('Ocurrió un error desconocido al sincronizar las tablas.')
        }
    }
}

export default sequelize