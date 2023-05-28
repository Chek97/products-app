import { connect } from 'mongoose';
import getConfig from 'next/config';

const connection = {
    isConnected: false
};
const { serverRuntimeConfig } = getConfig();

async function getConection(){
    if(connection.isConnected) return;

    try {
        const db = await connect(process.env.MONGODB_URL || serverRuntimeConfig.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        connection.isConnected = db.connections[0].readyState;
        console.log("Conexion a base de datos");
    } catch (error) {
        console.error("Error al conectar ", error);
    }
}

export default getConection;