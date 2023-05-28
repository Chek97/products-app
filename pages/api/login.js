import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs'
const dataPath = path.join(process.cwd(), 'DB/users.json');

export default function handler(req, res) {
    if(req.method === "POST"){
        const body = req.body;
        let data = fs.readFileSync(dataPath);
        
        if(data === undefined){
            res.status(500).json({
                ok: false,
                message: "La base de datos no fue encontrada"
            });
        }else{
            const { users } = JSON.parse(data);
            const checkUser = users.find(user => {
                if(user.email === body.email && bcrypt.compareSync(body.password, user.password)){
                    return user;
                }
            });

            if(checkUser !== undefined){
                res.status(200).json({
                    ok: true,
                    message: "Login con exito",
                    user: {
                        email: body.email,
                        name: body.fullName
                    }
                });
            }else{
                res.status(400).json({
                    ok: false,
                    message: "No hay ningun usuario registrado con eso",
                });
            }
        }
    }
}