import fs from 'fs';
import path from 'path';

const handler = (req, res) => {


    if(req.method === 'POST')
    {
        const newEmail = {
            id : new Date().toISOString(),
            email : req.body.email
        }

        const filepath = path.join(process.cwd(),'data','newsletter.json');
        const fileData = JSON.parse(fs.readFileSync(filepath));
        fileData.push(newEmail)
        fs.writeFileSync(filepath,JSON.stringify(fileData));

        return res.status(200).json({
            'status' : 200,
            'message' : 'You are subscibed to the list!',
            'email' : req.body.email
        })
    } else {
        return res.status(200).json({
            'message' : 'It works!'
        })
    }
   
}

export default handler;