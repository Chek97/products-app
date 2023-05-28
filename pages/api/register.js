import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'DB/users.json');

export default function handler(req, res) {
    if(req.method === "POST"){
        let data = fs.readFileSync(dataPath);
        if(data === undefined){
            res.status(500).json({
                ok: false,
                message: "La base de datos no fue encontrada"
            });
        }else{
            const users = JSON.parse(data);
            users.users.push(req.body);       
            fs.writeFileSync(dataPath, JSON.stringify(users));
            res.status(200).json({
                ok: true,
                message: "Usuario agregado con exito",
                user: req.body
            });
        }
    }
}